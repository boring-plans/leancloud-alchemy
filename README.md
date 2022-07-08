
# LeanCloud Alchemy

这是一个用来更便捷地操作 LeanCloud 数据的工具。


## Before Everything

当然，在此之前需要有个用于数据存储的 LC 应用。注册、配置参考[这里](https://github.com/boring-plans/boring-days#%E6%B3%A8%E5%86%8C)。
## Installation

Install leancloud-alchemy with npm

```bash
npm install leancloud-alchemy
```

## Usage/Examples

### Initialize

```js
import LeancloudAlchemy from 'leancloud-alchemy'

LeanCloudAlchemy.initAV(
    'your-app-id',
    'your-app-key'
);
```

### Create

假设有个 `Feedback` Class，可以这样创建一条记录：

```js
LeancloudAlchemy.createRow(
    'Feedback', 
    {
        key: 'feedback-key',
        state: 'feedback-state',
        comment: 'feedback-comment'
    }
);
```

创建一些记录：

```js
LeancloudAlchemy.createRows(
    'Feedback', 
    [
        {
            key: 'feedback-key',
            state: 'feedback-state',
            comment: 'feedback-comment'
        },
        {
            key: 'feedback-key-2',
            state: 'feedback-state-2',
            comment: 'feedback-comment-2'
        }
    ]
);
```

### Delete

依据 `id`（LC 自动生成的 objectId ）删除某条记录：

```js
LeancloudAlchemy.deleteRow('Feedback', 'object-id');
```

删除某些：

```js
LeancloudAlchemy.deleteRows(
    'Feedback', 
    ['object-id', 'object-id-2']
);
```

依据某个/些属性的特定值删除某些：

```js
// 某个属性
LeancloudAlchemy.deleteRowsBy(
    'Feedback', 
    'key',
    'value'
);

// 某些属性，属性间取交
LeancloudAlchemy.deleteRowsBy(
    'Feedback', 
    [    
        ['key', 'key-value'],
        ['state', 'state-value'],
    ]
);
```

依据某个/些属性的范围值删除某些：

```js
// 某个属性
LeancloudAlchemy.deleteRowsContainedIn(
    'Feedback', 
    'key',
    ['value', 'value-2']
);

// 某些属性，属性间取交
LeancloudAlchemy.deleteRowsContainedIn(
    'Feedback', 
    [
        'key', ['key-value', 'key-value-2'],
        'state', ['state-value', 'state-value-2']
    ]
);
```

### Update

依据 `id` 更新某条记录：

```js
LeancloudAlchemy.updateRow(
    'Feedback',
    'object-id',
    {
        key: 'new-feedback-key',
        state: 'new-feedback-state',
        comment: 'new-feedback-comment'
    }
);
```

更新某些记录：

```js
LeancloudAlchemy.createRows(
    'Feedback', 
    [
        [
            'object-id',
            {
                key: 'new-feedback-key',
                state: 'new-feedback-state',
                comment: 'new-feedback-comment'
            }
        ],
        [
            'object-id-2',
            {
                key: 'new-feedback-key',
                state: 'new-feedback-state',
                comment: 'new-feedback-comment'
            }
        ],
    ]
);
```

### Retrieve

依据 `id` 获取某条记录：

```js
LeancloudAlchemy.getRow('Feedback', 'object-id');
```

获取某些记录：

```js
LeancloudAlchemy.getRows(
    'Feedback', 
    ['object-id', 'object-id-2']
);
```

依据某个/些属性的特定值获取某些：

```js
// 某个
LeancloudAlchemy.getRowsBy(
    'Feedback', 
    'key',
    'value'
);

// 某些，属性间取交
LeancloudAlchemy.getRowsBy(
    'Feedback', 
    [
        ['key', 'key-value'],
        ['state', 'state-value'],
    ]
);
```

依据某个/些属性的范围值获取某些：

```js
// 某个
LeancloudAlchemy.getRowsBy(
    'Feedback', 
    'key',
    ['value', 'value-2']
);

// 某些，属性间取交
LeancloudAlchemy.getRowsBy(
    'Feedback', 
    [
        ['key', ['key-value', 'key-value-2']],
        ['state', ['state-value', 'state-value-2']],
    ]
);
```

获取以 `key` 倒序的前五条记录：

```js
LeancloudAlchemy.getSomeRows('Feedback', 5, 'key', true);
```

获取无序（也就是入库时间顺序）的前六条记录：

```js
LeancloudAlchemy.getSomeRows('Feedback', 6);
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

