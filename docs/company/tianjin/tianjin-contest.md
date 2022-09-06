#### vue element form 封装思路
element ui 的表单组件常用写法如图所示,实际开发过程中需要在 data 中定义相关字段以及对应的 rules,然后再去 template 中增加相关 html 代码,以实现
功能,大概如下所示
```js
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
```


#### 简化代码
有一定使用经验之后,经过一定的思考,不难写出以下代码,下方的代码中包含了一些必须的字段,如果我们可以在此基础上做一些处理,那么就可以简化开发流程,只用改一下 data中的字段,就可以形成新的表单了,即实现 data => html
@[code](./form-data.js)


#### 可能会遇到的问题
1. 简化的代码需要通过一定的处理,才能得到element ui 中 form 表单所需要的数据,并且需要保证其没有问题,比较关键的代码如下所示

@[code{155-177} js](./form.vue)

2. select 组件 选项获取问题
- 对于确定性的选项,例如 性别,可以维护到字典中,然后在 form 组件中引入就行,

```js
state: {
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    dicts: {
        // 比赛的 状态
        contestStatus: [
            { label: '未开始', value: 1 },
            { label: '报名中', value: 2 },
            { label: '备赛中', value: 3 },
            { label: '比赛中', value: 4 },
            { label: '已结束', value: 5 },
            { label: '已结赛', value: 6 },
        ],
        contestStatusMap: {
            1: '未开始',
            2: '报名中',
            3: '备赛中',
            4: '比赛中',
            5: '已结束',
            6: '已结赛',
        },
    },
},
```

- 对于不确定的选项,例如,需要通过接口来获取的选项,可以通过配置接口,参数,labelKey,valueKey(即选却结果中的哪些字段来作为选项的key 和 label),然后异步加载

@[code{178-221} js](./form.vue)


