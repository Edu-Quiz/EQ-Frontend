import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
    const { unityProvider } = new useUnityContext({
        loaderUrl: "/game_binaries/Build/WebGL.loader.js",
        dataUrl: "/game_binaries/Build/WebGL.data",
        frameworkUrl: "/game_binaries/Build/WebGL.framework.js",
        codeUrl: "/game_binaries/Build/WebGL.wasm",
      });
    
      return <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }}/>;
    }

export default Game;
