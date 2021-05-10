;(function rwcCpuInfoInit() {
    let promiseResolvers = [];
    window.addEventListener('message', e => {
        if (e.data?.cpuInfo && promiseResolvers.length > 0) {
            const resultResolver = promiseResolvers.shift();
            resultResolver?.(e.data.cpuInfo);
        }
    });

    window.rwc_getCpuInfo = function getCpuInfo() {
        let promiseResolver;
        const result = new Promise(resolve => {
            promiseResolver = resolve;
        });
        promiseResolvers.push(promiseResolver);
        window.postMessage('requestCpuInfo', '*');

        return result;
    };
})();
