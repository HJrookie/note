#### pve 嵌套虚拟化

1. 编辑 pve 这个虚拟机的配置
   <img width="796" alt="image" src="https://user-images.githubusercontent.com/27692261/222657527-7eebd80b-de7f-4f89-8175-74edc8117a2c.png">

2. 在 pve 所在的那台机器上修改配置

```shell
# 搜索对于的 vmx
find / -name *.vmx
# 结果类似 /vmfs/volumes/63d777cf-9a37b36e-cb9a-7ed30ae504a7/pve_1/pve.vmx  ,然后 vi, 文件最底部加入这几行
monitor.virtual_mmu = “automatic”
monitor.virtual_exec = “automatic”
vhv.enable = “TRUE”#
```

#### vue 函数多参数

```js
:on-success="(...args) => handleSuccess(...args, item)"
@change="handlecccc(...arguments,menu, item)"
```
