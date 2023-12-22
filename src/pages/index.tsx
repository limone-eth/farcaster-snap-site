import { useContext } from "react";

import {
  AlreadyInstalledButton,
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
} from "../components";
import { defaultSnapOrigin } from "../config";
import { MetamaskActions, MetaMaskContext } from "../hooks";
import {
  connectSnap,
  getSnap,
  isLocalSnap,
  shouldDisplayReconnectButton,
} from "../utils";

const Index = () => {
  const [state, dispatch] = useContext(MetaMaskContext);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  console.log(
    shouldDisplayReconnectButton(state.installedSnap),
    state.installedSnap
  );

  return (
    <>
      <main className="w-full py-20 justify-center items-center flex flex-col gap-72">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="lg:order-last rounded-xl w-full h-auto max-w-full"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Never send $$ to the wrong address again
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Farcaster Snap allows you to double check the address you are
                  sending to is correct by checking their Farcaster social
                  graph.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div>
                  {state.error && (
                    <div>
                      <b>An error happened:</b> {state.error.message}
                    </div>
                  )}
                  {!isMetaMaskReady && (
                    <div>
                      <InstallFlaskButton />,
                    </div>
                  )}
                  {isMetaMaskReady && !state.installedSnap && (
                    <div>
                      <ConnectButton
                        onClick={handleConnectClick}
                        disabled={!isMetaMaskReady}
                      />
                    </div>
                  )}
                  {isMetaMaskReady &&
                    shouldDisplayReconnectButton(state.installedSnap) && (
                      <ReconnectButton
                        onClick={handleConnectClick}
                        disabled={!state.installedSnap}
                      />
                    )}
                  {isMetaMaskReady && !!state.installedSnap && (
                    <AlreadyInstalledButton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center text-center gap-4">
            <div>
              <a href="https://limone.lol" target="_blank">
                <img
                  className="rounded-full h-16 w-16 mx-auto text-center"
                  src="/pfp.png"
                  alt="image description"
                ></img>
                <span className="font-bold">by limone.eth</span>
              </a>
            </div>
            <div>
              <a
                className="underline"
                target="_blank"
                href="https://github.com/limone-eth/farcaster-snap"
              >
                Leave a ⭐️ on Github
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
