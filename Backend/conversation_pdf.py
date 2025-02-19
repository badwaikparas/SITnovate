from langchain.chat_models import ChatOllama
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema import SystemMessage, HumanMessage
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler


def chatbot():
    system_prompt = """ 
    You are an AI assistant that provides concise, accurate answers.
    Maintain a conversational tone and be helpful.
    """

    llm = ChatOllama(
        model="llama3",
        callback_manager=CallbackManager([StreamingStdOutCallbackHandler()])
    )

    prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content=system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        HumanMessage(content="{user_input}")
    ])

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    conversation = LLMChain(
        llm=llm,
        prompt=prompt,
        memory=memory
    )

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Chat ended.")
            break
        print(user_input)
        response = conversation.run(user_input=user_input)
        print(f"AI: {response}")


# Call the function to start the chatbot
if __name__ == "__main__":
    chatbot()
