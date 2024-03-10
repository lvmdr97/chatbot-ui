import { ChatSettings } from "@/types"
import { StreamingTextResponse } from "ai"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatClientBase } from "../ChatClientBase"
import { ApiError } from "@/lib/error/ApiError"

export class GoogleChatClient extends ChatClientBase {
  private googleAI: GoogleGenerativeAI | undefined

  async initialize() {
    const profile = await getServerProfile()
    checkApiKey(profile.google_gemini_api_key, "Google")
    this.googleAI = new GoogleGenerativeAI(profile.google_gemini_api_key || "")
  }

  async generateChatCompletion(
    chatSettings: ChatSettings,
    messages: any[]
  ): Promise<any> {
    if (!this.googleAI) {
      throw new Error("Google AI client is not initialized")
    }

    const googleModel = this.googleAI.getGenerativeModel({
      model: chatSettings.model
    })

    if (chatSettings.model === "gemini-pro") {
      const lastMessage = messages.pop()

      return googleModel
        .startChat({
          history: messages,
          generationConfig: {
            temperature: chatSettings.temperature
          }
        })
        .sendMessageStream(lastMessage.parts)
    } else if (chatSettings.model === "gemini-pro-vision") {
      // FIX: Hacky until chat messages are supported
      const HACKY_MESSAGE = messages[messages.length - 1]

      return googleModel.generateContent([
        HACKY_MESSAGE.prompt,
        HACKY_MESSAGE.imageParts
      ])
    } else {
      throw new Error("Unsupported model type for Google AI")
    }
  }

  async generateChatCompletionStream(
    chatSettings: ChatSettings,
    messages: any[]
  ): Promise<StreamingTextResponse> {
    const chat = await this.generateChatCompletion(chatSettings, messages)
    return new StreamingTextResponse(chat)
  }

  handleError(error: ApiError): ApiError {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Google Gemini API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("api key not valid")) {
      errorMessage =
        "Google Gemini API Key is incorrect. Please fix it in your profile settings."
    }

    return new ApiError(errorMessage, errorCode)
  }
}
