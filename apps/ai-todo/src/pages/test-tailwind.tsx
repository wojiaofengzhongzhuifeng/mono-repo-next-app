import React from 'react'

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with center-container */}
      <header className="bg-white shadow-sm border-b">
        <div className="center-container">
          <div className="py-4">
            <h1 className="text-24 font-bold text-gray-900">Common Tailwind 插件测试</h1>
            <p className="text-16 text-gray-600 mt-2">测试各种插件的功能和效果</p>
          </div>
        </div>
      </header>

      <main>
        {/* Center Container 测试 */}
        <section className="section-block-20">
          <div className="center-container">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-20 font-semibold text-blue-900 mb-4">Center Container 测试</h2>
              <p className="text-16 text-blue-700 mb-4">
                这个容器使用了 <code className="bg-blue-100 px-2 py-1 rounded">.center-container</code> 类
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h3 className="text-16 font-medium text-blue-900 mb-2">响应式内边距</h3>
                  <p className="text-14 text-blue-700">• 默认: px-3 (12px)</p>
                  <p className="text-14 text-blue-700">• 375.1px+: px-4 (16px)</p>
                  <p className="text-14 text-blue-700">• 768.1px+: px-6 (24px)</p>
                </div>
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h3 className="text-16 font-medium text-blue-900 mb-2">响应式最大宽度</h3>
                  <p className="text-14 text-blue-700">• 默认: calc(100vw - 24px)</p>
                  <p className="text-14 text-blue-700">• 375.1px+: 736px</p>
                  <p className="text-14 text-blue-700">• 768.1px+: 1200px</p>
                </div>
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h3 className="text-16 font-medium text-blue-900 mb-2">测试成功</h3>
                  <p className="text-14 text-green-600">✅ 插件正常工作</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing 测试 */}
        <section className="section-block-20">
          <div className="center-container">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-20 font-semibold text-green-900 mb-4">Spacing 插件测试</h2>
              <p className="text-16 text-green-700 mb-4">
                基于 2 倍规则的间距系统：数字 n 表示 n*2px 的间距
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded border border-green-200">
                  <h3 className="text-16 font-medium text-green-900 mb-2">示例间距</h3>
                  <div className="space-y-2">
                    <div className="bg-green-100 p-10">p-10 = 20px</div>
                    <div className="bg-green-200 p-20">p-20 = 40px</div>
                    <div className="bg-green-300 p-30">p-30 = 60px</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-green-200">
                  <h3 className="text-16 font-medium text-green-900 mb-2">Margin</h3>
                  <div className="space-y-2">
                    <div className="bg-green-100 mx-2">m-2 = 4px</div>
                    <div className="bg-green-200 mx-4">m-4 = 8px</div>
                    <div className="bg-green-300 mx-6">m-6 = 12px</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-green-200">
                  <h3 className="text-16 font-medium text-green-900 mb-2">Gap</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-100 h-8"></div>
                      <div className="bg-green-100 h-8"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-200 h-8"></div>
                      <div className="bg-green-200 h-8"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-green-200">
                  <h3 className="text-16 font-medium text-green-900 mb-2">测试结果</h3>
                  <p className="text-14 text-green-600">✅ 间距系统正常</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Font Size 测试 */}
        <section className="section-block-20">
          <div className="center-container">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h2 className="text-20 font-semibold text-purple-900 mb-4">Font Size 插件测试</h2>
              <p className="text-16 text-purple-700 mb-4">
                支持 12px 到 80px 的字体大小，以及字体大小/行高的组合
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded border border-purple-200">
                  <h3 className="text-16 font-medium text-purple-900 mb-4">基础字体大小</h3>
                  <div className="space-y-3">
                    <p className="font-12">font-12: 12px 字体大小</p>
                    <p className="font-16">font-16: 16px 字体大小</p>
                    <p className="font-20">font-20: 20px 字体大小</p>
                    <p className="font-24">font-24: 24px 字体大小</p>
                    <p className="font-32">font-32: 32px 字体大小</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-purple-200">
                  <h3 className="text-16 font-medium text-purple-900 mb-4">字体大小/行高组合</h3>
                  <div className="space-y-3">
                    <p className="text-12/14">text-12/14: 12px 字体, 14px 行高</p>
                    <p className="text-16/20">text-16/20: 16px 字体, 20px 行高</p>
                    <p className="text-20/28">text-20/28: 20px 字体, 28px 行高</p>
                    <p className="text-24/32">text-24/32: 24px 字体, 32px 行高</p>
                    <p className="text-32/40">text-32/40: 32px 字体, 40px 行高</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Block 测试 */}
        <section className="section-block-45-20">
          <div className="center-container">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h2 className="text-20 font-semibold text-orange-900 mb-4">Section Block 插件测试</h2>
              <p className="text-16 text-orange-700 mb-4">
                内容区块间距插件，支持响应式和不对称间距
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded border border-orange-200">
                  <h3 className="text-16 font-medium text-orange-900 mb-4">对称间距示例</h3>
                  <div className="space-y-4">
                    <div className="bg-orange-100 p-4">
                      <p className="text-14 font-medium">section-block-20</p>
                      <p className="text-12 text-orange-600">上下间距: 40px (20*2)</p>
                    </div>
                    <div className="bg-orange-200 p-4">
                      <p className="text-14 font-medium">section-block-30</p>
                      <p className="text-12 text-orange-600">上下间距: 60px (30*2)</p>
                    </div>
                    <div className="bg-orange-300 p-4">
                      <p className="text-14 font-medium">section-block-45</p>
                      <p className="text-12 text-orange-600">上下间距: 90px (45*2)</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-orange-200">
                  <h3 className="text-16 font-medium text-orange-900 mb-4">不对称间距示例</h3>
                  <div className="space-y-4">
                    <div className="bg-orange-100 p-4">
                      <p className="text-14 font-medium">section-block-30-20</p>
                      <p className="text-12 text-orange-600">上间距: 60px, 下间距: 40px</p>
                    </div>
                    <div className="bg-orange-200 p-4">
                      <p className="text-14 font-medium">section-block-45-20</p>
                      <p className="text-12 text-orange-600">桌面端: 90px, 移动端: 40px</p>
                    </div>
                    <div className="bg-orange-300 p-4">
                      <p className="text-14 font-medium">section-block-top-20</p>
                      <p className="text-12 text-orange-600">仅上间距: 40px</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 综合测试 */}
        <section className="section-block-30-20">
          <div className="center-container">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
              <h2 className="text-32 font-bold mb-4">综合测试</h2>
              <p className="text-20 mb-6">
                这个区域使用了所有插件的组合效果
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-18 font-semibold mb-2">Center Container</h3>
                  <p className="text-14 opacity-90">响应式居中容器</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-18 font-semibold mb-2">Spacing</h3>
                  <p className="text-14 opacity-90">2倍规则间距系统</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-18 font-semibold mb-2">Font Size</h3>
                  <p className="text-14 opacity-90">灵活的字体大小</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white section-block">
        <div className="center-container">
          <div className="text-center">
            <h3 className="text-18 font-semibold mb-2">Common Tailwind 插件包</h3>
            <p className="text-14 text-gray-400 mb-4">
              为 monorepo 项目提供统一的 Tailwind CSS 插件和工具类
            </p>
            <div className="flex justify-center space-x-4 text-12">
              <span className="bg-gray-700 px-3 py-1 rounded">center-container</span>
              <span className="bg-gray-700 px-3 py-1 rounded">spacing</span>
              <span className="bg-gray-700 px-3 py-1 rounded">font-size</span>
              <span className="bg-gray-700 px-3 py-1 rounded">section-block</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
