export const USER_INFO = {
  code: 0,
  message: '获取用户信息成功',
  data: {
    id: 1,
    user_id: 'user001',
    nickname: '测试用户',
    created_at: '2025-10-27T12:53:52.160Z',
    totalPoints: 1500,
  },
}

export const GET_COUNT_NUMBER = {
  code: 0,
  message: '获取计数成功',
  data: {
    number: 123,
    id: 123,
    testList: [1, 2],
  },
}

export const USER_TARGETS = {
  code: 0,
  message: '获取用户信息成功',
  data: {
    id: number, // 1,
    name: string, //"iPhone  ",
    description: number, // "5000",
    user_id: string, // "user001",
    is_redeemed: boolean, // true
    created_at: string, // "2025-10-27T12:53:52.160Z",
    user: { nickname: string }, //测试用户
  },
}
