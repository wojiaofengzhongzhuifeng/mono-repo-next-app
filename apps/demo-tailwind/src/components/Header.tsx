import React from 'react'

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="center-container">
        <div className="flex items-center justify-between p-20">
          <div className="flex items-center gap-10">
            <h1 className="font-24 font-bold">Demo Tailwind</h1>
            <span className="text-14 text-muted-foreground">
              展示 common-tailwind 包的所有功能
            </span>
          </div>
          <nav className="flex items-center gap-15">
            <a href="#spacing" className="text-16 hover:text-accent-foreground transition-colors">
              间距系统
            </a>
            <a href="#fontSize" className="text-16 hover:text-accent-foreground transition-colors">
              字体大小
            </a>
            <a href="#centerContainer" className="text-16 hover:text-accent-foreground transition-colors">
              居中容器
            </a>
            <a href="#sectionBlock" className="text-16 hover:text-accent-foreground transition-colors">
              区块间距
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
