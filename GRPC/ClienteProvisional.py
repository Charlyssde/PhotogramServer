import grpc
import Chat_pb2_grpc as str_grpc
import Chat_pb2 as structure


def main():
    host = 'localhost'
    port = 1337

    channel = grpc.insecure_channel(host + ':' + str(port))

    stub = str_grpc.ChatStub(channel)
    user = structure.Usuario(username = "user1", idUsuario = "1")
    user2 = structure.Usuario(username = "user2", idUsuario = "2")
    listaU = list()
    listaU.append(user)
    listaU.append(user2)
    listaM = list()
    conv = structure.Conversacion(key = "1", usuarios = listaU, mensajes = listaM)
    response = stub.iniciarConversacion(conv)


    print(response)

if __name__ == '__main__':
    main()