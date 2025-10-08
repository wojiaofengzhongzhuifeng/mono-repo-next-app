import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-secondary text-secondary-foreground'>
      <div className='center-container'>
        <div className='section-block'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-20'>
            <div>
              <h3 className='font-20 font-semibold mb-10'>关于项目</h3>
              <p className='text-14 text-muted-foreground'>
                这是一个演示项目，展示了 common-tailwind 包提供的所有功能，
                包括间距系统、字体大小、居中容器和区块间距等。
              </p>
            </div>
            <div>
              <h3 className='font-20 font-semibold mb-10'>功能特性</h3>
              <ul className='text-14 text-muted-foreground space-y-5'>
                <li>• 基于 2 倍规则的间距系统</li>
                <li>• 12px-80px 的字体大小支持</li>
                <li>• 响应式居中容器</li>
                <li>• 灵活的区块间距配置</li>
              </ul>
            </div>
            <div>
              <h3 className='font-20 font-semibold mb-10'>技术栈</h3>
              <ul className='text-14 text-muted-foreground space-y-5'>
                <li>• Next.js 14</li>
                <li>• Tailwind CSS 3</li>
                <li>• TypeScript</li>
                <li>• Monorepo 架构</li>
              </ul>
            </div>
          </div>
          <div className='border-t border-border mt-20 pt-20 text-center'>
            <p className='text-12 text-muted-foreground'>
              © 2024 Demo Tailwind. 使用 common-tailwind 包构建。
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
