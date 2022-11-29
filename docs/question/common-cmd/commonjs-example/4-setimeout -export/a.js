setTimeout(() => {
    // 这里又导出了一次
    module.exports = {
        val: 101
    }
}, 100)

module.exports = {
    val: 1
}