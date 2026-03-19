import React from 'react';
import { ArrowRight, Blocks, FileSearch, ShieldCheck } from 'lucide-react';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';

const navigationItems = ['智能解析', '批量筛选', 'API 文档'];

const featureItems = [
  {
    icon: FileSearch,
    title: '结构化提取',
    description: '从 PDF 中提取候选人关键信息，直接进入评估流程。',
  },
  {
    icon: Blocks,
    title: '岗位对齐',
    description: '将履历与 JD 逐项比对，不再依赖人工快速扫读。',
  },
  {
    icon: ShieldCheck,
    title: '结果可复核',
    description: '优势、缺口与建议分开展示，方便团队二次判断。',
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.14),_transparent_44%),linear-gradient(180deg,_rgba(24,24,27,0.98),_rgba(12,10,9,1))]" />
      <div className="flex min-h-screen flex-col">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/80 backdrop-blur-xl">
          <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/10 text-amber-200">
                <FileSearch className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm uppercase tracking-[0.28em] text-stone-500">Resume Intelligence</span>
                <span className="text-lg font-semibold text-stone-100">ResuMind</span>
              </div>
            </div>

            <div className="hidden items-center gap-8 text-sm font-medium text-stone-400 md:flex">
              {navigationItems.map((item) => (
                <a key={item} href="#" className="transition-colors hover:text-stone-100">
                  {item}
                </a>
              ))}
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-100 transition-colors hover:bg-white/10">
                预约演示
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </nav>

        <main className="grow pb-16">
          <section className="border-b border-white/10">
            <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_24rem] lg:px-8 lg:py-20">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-100/80">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  用于招聘初筛的结构化分析
                </div>
                <h1 className="mt-7 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  把简历筛选从情绪判断，拉回到可复核的证据面板。
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                  上传候选人 PDF 和岗位描述，系统会输出匹配分、技能标签、项目摘要以及风险提示，帮助用人团队更快做出一致判断。
                </p>
                <div className="mt-10 flex flex-wrap gap-4 text-sm text-stone-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-2xl font-semibold text-white">1 分钟内</div>
                    <div className="mt-1 text-stone-400">完成单份简历初筛</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-2xl font-semibold text-white">结构化输出</div>
                    <div className="mt-1 text-stone-400">便于面试官和 HR 协同复核</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {featureItems.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
                    <p className="mt-2 text-sm leading-7 text-stone-400">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
            <ResumeAnalyzer />
          </section>
        </main>

        <footer className="border-t border-white/10 bg-stone-950/80 py-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-stone-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>© 2026 ResuMind. Built with React, TypeScript, FastAPI and Redis.</p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-stone-600">
              <span>Serverless</span>
              <span className="h-1 w-1 rounded-full bg-stone-700" />
              <span>Cache-first</span>
              <span className="h-1 w-1 rounded-full bg-stone-700" />
              <span>REST API</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;