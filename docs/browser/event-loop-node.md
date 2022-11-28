#### nodejs 的 event loop
首先明确一个基本概念,nodejs 使用了`Chrome 的V8 引擎`,但是 nodej 的`event loop`是基于`libuv`(C++的库), Chrome的`event loop`实现是基于`libevent`  
Deno 的`event loop`使用了 `Rust-based tokIO`  


