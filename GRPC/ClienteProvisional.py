import grpc
import Chat_pb2_grpc as str_grpc
import Chat_pb2 as structure


def main():
    host = 'localhost'
    port = 1337

    channel = grpc.insecure_channel(host + ':' + str(port))

    stub = str_grpc.ChatStub(channel)
    user = structure.Usuario(username = "Charly")
    user2 = structure.Usuario(username = "Charlyssde")
    listaU = list()
    listaU.append(user)
    listaU.append(user2)
    listaM = list()
    key = user.username + user2.username
    conv = structure.Conversacion(key = key , usuarios = listaU, mensajes = listaM)
    response = stub.iniciarConversacion(conv)


    print(response)

if __name__ == '__main__':
    main()