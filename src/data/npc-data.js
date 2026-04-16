/**
 * NPC 数据文件
 * 存储默认 NPC 配置数据
 * 性别比例：80% 女性，20% 男性
 */

const NPCData = [
    {
        id: 'sakura_001',
        name: '樱子',
        gender: 'female',
        ageGroup: 'young',
        role: 'quest-giver',
        portrait: 'assets/images/portrait-female-1.svg',
        dialogue: [
            '你好呀！我是樱子。',
            '最近村子里发生了一些奇怪的事情...',
            '你看起来很可靠，能帮我一个忙吗？'
        ],
        quests: [
            {
                id: 'quest_001',
                name: '寻找丢失的樱花项链',
                description: '樱子的樱花项链在森林里丢失了，请帮她找回来。',
                conditions: [
                    { type: 'collect', target: 1, current: 0, item: '樱花项链' }
                ],
                rewards: { exp: 200, gold: 100 }
            }
        ]
    },
    {
        id: 'yuki_002',
        name: '美咲',
        gender: 'female',
        ageGroup: 'young-adult',
        role: 'merchant',
        portrait: 'assets/images/portrait-female-2.svg',
        dialogue: [
            '欢迎光临！我是美咲，这家店的店主。',
            '看看有什么需要的吗？',
            '今天刚到了不少好货呢！'
        ],
        quests: []
    },
    {
        id: 'luna_003',
        name: '千夏',
        gender: 'female',
        ageGroup: 'young',
        role: 'villager',
        portrait: 'assets/images/portrait-female-3.svg',
        dialogue: [
            '啊，你好！',
            '今天天气真好，适合出去冒险呢。',
            '你要小心哦，森林里有魔物出没。'
        ],
        quests: []
    },
    {
        id: 'akane_004',
        name: '由依',
        gender: 'female',
        ageGroup: 'young-adult',
        role: 'companion',
        portrait: 'assets/images/portrait-female-4.svg',
        dialogue: [
            '你好！我叫由依。',
            '一个人旅行好寂寞...',
            '我可以和你一起走吗？我会努力帮上忙的！'
        ],
        quests: []
    },
    {
        id: 'sakura_005',
        name: '诗织',
        gender: 'female',
        ageGroup: 'young',
        role: 'villager',
        portrait: 'assets/images/portrait-female-1.svg',
        dialogue: [
            '你好呀~',
            '你是新来的冒险者吧？',
            '欢迎来到我们村子！'
        ],
        quests: []
    },
    {
        id: 'yuki_006',
        name: '绫乃',
        gender: 'female',
        ageGroup: 'young-adult',
        role: 'quest-giver',
        portrait: 'assets/images/portrait-female-2.svg',
        dialogue: [
            '你好，冒险者。',
            '我有个重要的任务要委托给你。',
            '这关系到整个村子的安危...'
        ],
        quests: [
            {
                id: 'quest_002',
                name: '讨伐森林魔物',
                description: '森林里的魔物越来越猖獗，请消灭它们保护村民。',
                conditions: [
                    { type: 'kill', target: 5, current: 0, enemy: '森林狼' }
                ],
                rewards: { exp: 500, gold: 300 }
            }
        ]
    },
    {
        id: 'luna_007',
        name: '优奈',
        gender: 'female',
        ageGroup: 'young',
        role: 'merchant',
        portrait: 'assets/images/portrait-female-3.svg',
        dialogue: [
            '嗨！我是优奈~',
            '我的商品价格可是全大陆最优惠的哦！',
            '不买点什么吗？'
        ],
        quests: []
    },
    {
        id: 'akane_008',
        name: '遥',
        gender: 'female',
        ageGroup: 'young-adult',
        role: 'villager',
        portrait: 'assets/images/portrait-female-4.svg',
        dialogue: [
            '你好。',
            '最近的日子过得很平静呢。',
            '希望你能在这里度过愉快的时光。'
        ],
        quests: []
    },
    {
        id: 'takeshi_009',
        name: '健太',
        gender: 'male',
        ageGroup: 'adult',
        role: 'merchant',
        portrait: 'assets/images/portrait-male-1.svg',
        dialogue: [
            '哟，冒险者！',
            '需要武器或者防具吗？',
            '我这可是有不少好东西！'
        ],
        quests: []
    },
    {
        id: 'kenji_010',
        name: '大辅',
        gender: 'male',
        ageGroup: 'adult',
        role: 'villager',
        portrait: 'assets/images/portrait-male-2.svg',
        dialogue: [
            '你好啊。',
            '我是个普通的村民，没什么特别的故事。',
            '不过如果你需要什么帮助，尽管开口。'
        ],
        quests: []
    }
];

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NPCData;
}
