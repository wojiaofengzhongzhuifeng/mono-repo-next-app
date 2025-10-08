import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'>
          <div className='center-container'>
            <div className='section-block-60 text-center'>
              <h1 className='font-48 font-bold mb-15'>
                Common Tailwind 功能演示
              </h1>
              <p className='font-20 max-w-3xl mx-auto'>
                这个页面展示了 @mono-repo/common-tailwind 包提供的所有功能，
                包括间距系统、字体大小、居中容器和区块间距等。
              </p>
            </div>
          </div>
        </section>

        {/* Spacing Demo */}
        <section id='spacing' className='bg-card'>
          <div className='center-container'>
            <div className='section-block'>
              <h2 className='font-32 font-bold mb-20 text-center'>
                间距系统 (Spacing)
              </h2>
              <div className='bg-muted p-20 rounded-lg'>
                <p className='font-16 mb-15'>
                  基于 2 倍规则的间距系统：数字 n 表示 n*2px 的间距
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
                  <div className='bg-background p-10 border border-border'>
                    <h3 className='font-18 font-semibold mb-10'>内边距示例</h3>
                    <div className='space-y-10'>
                      <div className='bg-primary/10 p-5'>p-5 = 10px</div>
                      <div className='bg-primary/10 p-10'>p-10 = 20px</div>
                      <div className='bg-primary/10 p-15'>p-15 = 30px</div>
                      <div className='bg-primary/10 p-20'>p-20 = 40px</div>
                    </div>
                  </div>
                  <div className='bg-background p-10 border border-border'>
                    <h3 className='font-18 font-semibold mb-10'>外边距示例</h3>
                    <div className='space-y-10'>
                      <div className='bg-secondary/20 m-5'>m-5 = 10px</div>
                      <div className='bg-secondary/20 m-10'>m-10 = 20px</div>
                      <div className='bg-secondary/20 m-15'>m-15 = 30px</div>
                      <div className='bg-secondary/20 m-20'>m-20 = 40px</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Font Size Demo */}
        <section id='fontSize' className='bg-background'>
          <div className='center-container'>
            <div className='section-block'>
              <h2 className='font-32 font-bold mb-20 text-center'>
                字体大小 (Font Size)
              </h2>
              <div className='bg-muted p-20 rounded-lg'>
                <p className='font-16 mb-15'>
                  支持 12px 到 80px 的字体大小和行高组合
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
                  <div className='bg-background p-10 border border-border'>
                    <h3 className='font-18 font-semibold mb-10'>
                      基础字体大小
                    </h3>
                    <div className='space-y-8'>
                      <p className='font-12'>font-12 = 12px</p>
                      <p className='font-14'>font-14 = 14px</p>
                      <p className='font-16'>font-16 = 16px</p>
                      <p className='font-18'>font-18 = 18px</p>
                      <p className='font-20'>font-20 = 20px</p>
                      <p className='font-24'>font-24 = 24px</p>
                      <p className='font-32'>font-32 = 32px</p>
                    </div>
                  </div>
                  <div className='bg-background p-10 border border-border'>
                    <h3 className='font-18 font-semibold mb-10'>
                      字体大小/行高组合
                    </h3>
                    <div className='space-y-8'>
                      <p className='text-12/14'>
                        text-12/14 = 12px 字体, 14px 行高
                      </p>
                      <p className='text-14/18'>
                        text-14/18 = 14px 字体, 18px 行高
                      </p>
                      <p className='text-16/20'>
                        text-16/20 = 16px 字体, 20px 行高
                      </p>
                      <p className='text-18/24'>
                        text-18/24 = 18px 字体, 24px 行高
                      </p>
                      <p className='text-20/28'>
                        text-20/28 = 20px 字体, 28px 行高
                      </p>
                      <p className='text-24/32'>
                        text-24/32 = 24px 字体, 32px 行高
                      </p>
                      <p className='text-32/40'>
                        text-32/40 = 32px 字体, 40px 行高
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Center Container Demo */}
        <section id='centerContainer' className='bg-card'>
          <div className='center-container'>
            <div className='section-block'>
              <h2 className='font-32 font-bold mb-20 text-center'>
                居中容器 (Center Container)
              </h2>
              <div className='bg-muted p-20 rounded-lg'>
                <p className='font-16 mb-15'>提供响应式的居中容器类名</p>
                <div className='space-y-20'>
                  <div className='center-container bg-primary/10 p-20 border-2 border-primary'>
                    <h3 className='font-20 font-semibold mb-10'>
                      默认居中容器 (.center-container)
                    </h3>
                    <p className='font-14'>
                      默认：px-3, max-width: calc(100vw - 24px)
                      <br />
                      375.1px+：px-4, max-width: 736px
                      <br />
                      768.1px+：px-6, max-width: 1200px
                    </p>
                  </div>
                  <div className='center-container-sm bg-secondary/10 p-20 border-2 border-secondary'>
                    <h3 className='font-20 font-semibold mb-10'>
                      小尺寸容器 (.center-container-sm)
                    </h3>
                    <p className='font-14'>小尺寸容器 (640px)</p>
                  </div>
                  <div className='center-container-md bg-accent/10 p-20 border-2 border-accent'>
                    <h3 className='font-20 font-semibold mb-10'>
                      中尺寸容器 (.center-container-md)
                    </h3>
                    <p className='font-14'>中尺寸容器 (768px)</p>
                  </div>
                  <div className='center-container-lg bg-muted/50 p-20 border-2 border-muted-foreground'>
                    <h3 className='font-20 font-semibold mb-10'>
                      大尺寸容器 (.center-container-lg)
                    </h3>
                    <p className='font-14'>大尺寸容器 (1024px)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Block Demo */}
        <section id='sectionBlock' className='bg-background'>
          <div className='center-container'>
            <div className='section-block'>
              <h2 className='font-32 font-bold mb-20 text-center'>
                区块间距 (Section Block)
              </h2>
              <div className='bg-muted p-20 rounded-lg'>
                <p className='font-16 mb-15'>
                  内容区块间距插件，支持响应式和不对称间距
                </p>
                <div className='space-y-20'>
                  <div className='section-block bg-primary/10 p-20 border border-primary'>
                    <h3 className='font-20 font-semibold mb-10'>
                      默认区块间距 (.section-block)
                    </h3>
                    <p className='font-14'>桌面端 90px, 移动端 24px</p>
                  </div>
                  <div className='section-block-20 bg-secondary/10 p-20 border border-secondary'>
                    <h3 className='font-20 font-semibold mb-10'>
                      指定间距 (.section-block-20)
                    </h3>
                    <p className='font-14'>上下间距：40px (20*2)</p>
                  </div>
                  <div className='section-block-30-20 bg-accent/10 p-20 border border-accent'>
                    <h3 className='font-20 font-semibold mb-10'>
                      不对称间距 (.section-block-30-20)
                    </h3>
                    <p className='font-14'>上间距：60px, 下间距：40px</p>
                  </div>
                  <div className='section-block-top-20 section-block-bottom-10 bg-muted/50 p-20 border border-muted-foreground'>
                    <h3 className='font-20 font-semibold mb-10'>
                      单独设置上下间距
                    </h3>
                    <p className='font-14'>仅上间距：40px, 仅下间距：20px</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Demo */}
        <section className='bg-card'>
          <div className='center-container'>
            <div className='section-block'>
              <h2 className='font-32 font-bold mb-20 text-center'>综合演示</h2>
              <div className='bg-gradient-to-r from-primary/10 to-secondary/10 p-30 rounded-lg border border-border'>
                <p className='font-16 mb-15'>这里展示了所有功能的组合使用</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-15'>
                  <div className='bg-background p-15 rounded-lg shadow-sm'>
                    <h4 className='font-18 font-semibold mb-8 text-primary'>
                      间距系统
                    </h4>
                    <p className='font-14 text-muted-foreground p-10 bg-muted rounded'>
                      使用了 p-15 内边距和 gap-15 间距
                    </p>
                  </div>
                  <div className='bg-background p-15 rounded-lg shadow-sm'>
                    <h4 className='font-18 font-semibold mb-8 text-secondary'>
                      字体大小
                    </h4>
                    <p className='text-14/16 text-muted-foreground'>
                      使用了 font-18 和 text-14/16 组合
                    </p>
                  </div>
                  <div className='bg-background p-15 rounded-lg shadow-sm'>
                    <h4 className='font-18 font-semibold mb-8 text-accent-foreground'>
                      区块间距
                    </h4>
                    <p className='font-14 text-muted-foreground'>
                      整个区域使用了 section-block-30
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
