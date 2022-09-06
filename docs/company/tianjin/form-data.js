let o = {
    form: {
        // form 的配置
        formConfig: {
            inline: true,
            labelWidth: '75px',
        },
        // form-item 的配置
        items: [
            {
                prop: 'name',
                value: undefined,
                label: '赛事名称',
                inputType: 'select',
                blankPlaceholder: false,
                options: {
                    ajax: getContestInfo,   // 这是获取结果的函数
                    dictName: 'allContestNames',
                    labelKey: 'competitionName', // 代表取哪一个 key 作为 label
                    valueKey: 'id', // 代表取哪一个 key 作为 value
                },
            },
            {
                prop: 'period',
                value: undefined,
                label: '赛届名称',
                inputType: 'input',
            },
            {
                prop: 'year',
                value: undefined,
                label: '举办年份',
                inputType: 'inputNumber',
            },
            {
                prop: 'status',
                value: undefined,
                label: '状态',
                inputType: 'select',
                options: 'contestStatus',
            },
        ],
    },
};