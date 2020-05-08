import { WebSocket, Server } from "mock-socket";
import { NeuroioWsApiV1 } from "../../../src/v1";

import { apiEndpoints } from "../../__mocks__/constants";

describe("NeuroioWsApiV1 test", () => {
  const mockedServer = new Server(apiEndpoints.v1);
  const mockedToken = "mocked token";
  const neuroioWsApi = new NeuroioWsApiV1({
    apiEndpoints,
    SocketClient: WebSocket,
    token: mockedToken,
  });

  const mockedEmit = jest.fn();

  neuroioWsApi.emit = mockedEmit;

  afterEach(() => {
    mockedEmit.mockClear();
  });

  describe("connect method test", () => {
    let pingPongMessages = [];

    afterEach(() => {
      neuroioWsApi.disconnect();
      pingPongMessages = [];
    });

    mockedServer.on("connection", (socket) => {
      socket.on("message", (data) => {
        // add messages to mocked queue
        pingPongMessages.push(data);
      });
    });

    test("should send auth message on connect", () => {
      return new Promise((done) => {
        const authMessage = JSON.stringify({
          action: "AUTH",
          data: {
            token: mockedToken,
          },
        });

        neuroioWsApi.connect();

        /** NOTE: this timeout is for creating another micro task that will
         * happen after the send in connect
         */
        setTimeout(() => {
          expect(pingPongMessages[0]).toBe(authMessage);
          done();
        }, 100);
      });
    });

    test("should not emit AUTH message event with message on socket message event", () => {
      return new Promise((done) => {
        const mockedMessage = {
          auth: "ok",
        };

        neuroioWsApi.connect();

        mockedServer.on("connection", (socket) => {
          socket.send(JSON.stringify(mockedMessage));

          /** NOTE: this timeout is for creating another micro task that will
           * happen after the send in connect
           */
          setTimeout(() => {
            expect(mockedEmit).not.toHaveBeenCalledWith(
              "message",
              mockedMessage
            );
            expect(mockedEmit).toHaveBeenCalledWith("connect");

            done();
          }, 100);
        });
      });
    });

    test("should emit message event with message on socket message event", () => {
      return new Promise((done) => {
        const mockedMessage = {
          user: "Jane Doe",
          message: "Im here",
        };

        neuroioWsApi.connect();

        mockedServer.on("connection", (socket) => {
          socket.send(JSON.stringify(mockedMessage));

          /** NOTE: this timeout is for creating another micro task that will
           * happen after the send in connect
           */
          setTimeout(() => {
            expect(mockedEmit).toHaveBeenCalledWith("message", mockedMessage);
            done();
          }, 100);
        });
      });
    });

    /**
     * Этот тест не проходит, так как  mock-server не может в
     * сброс подписчиков
     */
    test.skip("should emit disconnect event with message on socket close event", () => {
      return new Promise((done) => {
        const mockedMessage = {
          code: 1000,
          wasClean: true,
        };

        neuroioWsApi.connect();

        function handleConnection(socket) {
          socket.close(JSON.stringify(mockedMessage));

          mockedServer.removeEventListener("connection", handleConnection);

          /** NOTE: this timeout is for creating another micro task that will
           * happen after the send in connect
           */
          setTimeout(() => {
            expect(mockedEmit.mock.calls[1][0]).toEqual("disconnect");
            expect(mockedEmit.mock.calls[1][1]).toMatchObject(mockedMessage);

            done();
          }, 100);
        }

        mockedServer.on("connection", handleConnection);
      });
    });

    test("should emit connect event on socket connection", () => {
      return new Promise((done) => {
        neuroioWsApi.connect();

        mockedServer.on("connection", () => {
          /** NOTE: this timeout is for creating another micro task that will
           * happen after the send in connect
           */
          setTimeout(() => {
            expect(mockedEmit).toHaveBeenCalledWith("connect");

            done();
          }, 100);
        });
      });
    });

    test("should emit a error event on invalid JSON message from server", () => {
      return new Promise((done) => {
        neuroioWsApi.connect();

        mockedServer.on("connection", (socket) => {
          /** NOTE: this timeout is for creating another micro task that will
           * happen after the send in connect
           */
          socket.send("string");

          setTimeout(() => {
            try {
              JSON.parse("string");
            } catch (error) {
              expect(mockedEmit).toHaveBeenCalledWith("error", error);
              done();
            }
          }, 100);
        });
      });
    });
  });

  describe("disconnect method test", () => {
    test("should call socket disconnect method", () => {
      return new Promise((done) => {
        neuroioWsApi.connect();

        mockedServer.on("connection", (socket) => {
          neuroioWsApi.disconnect();

          setTimeout(() => {
            expect(socket.readyState).toBe(socket.CLOSED);
            done();
          }, 100);
        });
      });
    });
  });

  describe("setToken method test", () => {
    afterAll(() => {
      neuroioWsApi.disconnect.restoreMock();
    });

    test("should call disconnect method and update token", () => {
      neuroioWsApi.disconnect = jest.fn();
      neuroioWsApi.isSocketOpen = true;

      neuroioWsApi.setToken("new token");

      expect(neuroioWsApi.disconnect).toHaveBeenCalledTimes(1);
      expect(neuroioWsApi.token).toBe("new token");
    });
  });
});
