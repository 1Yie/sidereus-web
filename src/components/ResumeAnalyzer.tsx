import React, { useState, type ChangeEvent } from "react";
import axios from "axios";
import {
  CloudUpload,
  FileText,
  GraduationCap,
  Lightbulb,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Scale,
  Zap,
} from "lucide-react";

import { type AnalysisResult } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const contactItems = data
    ? [
        { icon: Phone, value: data.basic_info.phone },
        { icon: Mail, value: data.basic_info.email },
        { icon: MapPin, value: data.basic_info.address },
        { icon: GraduationCap, value: data.career_summary.education, accent: true },
      ]
    : [];

  const startAnalysis = async () => {
    if (!file) return;
    setLoading(true);
    setData(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd", jd);

    try {
      // 这里的返回结构对应后端的 { status, cache_hit, data }
      const response = await axios.post<{
        data: AnalysisResult;
        cache_hit: boolean;
        process_time: string;
      }>(`${API_BASE}/analyze`, formData);

      setData(response.data.data);
      setIsCached(response.data.cache_hit);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("分析失败，请检查后端服务及 Redis 状态");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-4xl border border-white/10 bg-stone-900/70 p-4 shadow-[0_24px_100px_rgba(0,0,0,0.24)] backdrop-blur xl:p-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
        {/* 左侧：操作面板 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Analysis Setup
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-100">配置分析任务</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-200">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <label className="mb-2 block text-sm font-medium text-stone-300">简历文件 (PDF)</label>
            <div
              className={`rounded-3xl border border-dashed p-8 text-center transition-all ${file ? "border-amber-300/40 bg-amber-300/10" : "border-white/12 bg-white/3 hover:border-white/20 hover:bg-white/5"}`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="flex cursor-pointer flex-col items-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-stone-950 text-stone-200 shadow-sm">
                  {file ? <FileText className="h-6 w-6" /> : <CloudUpload className="h-6 w-6" />}
                </div>
                <span className="font-medium text-stone-100">
                  {file ? file.name : "选择简历 PDF"}
                </span>
                <span className="mt-1 text-xs text-stone-500">支持多页 PDF 解析</span>
              </label>
            </div>

            <label className="mb-2 mt-6 block text-sm font-medium text-stone-300">
              岗位描述 (JD)
            </label>
            <textarea
              className="h-48 w-full resize-none rounded-3xl border border-white/10 bg-white/4 p-4 text-sm text-stone-200 outline-none transition-all placeholder:text-stone-500 focus:border-amber-300/40 focus:ring-4 focus:ring-amber-300/10"
              placeholder="输入招聘需求，AI 将为你进行深度匹配评分..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />

            <button
              onClick={startAnalysis}
              disabled={loading || !file}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-amber-300 py-4 font-semibold text-stone-950 transition-all hover:bg-amber-200 disabled:bg-stone-700 disabled:text-stone-400"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> 正在分析...
                </>
              ) : (
                <>
                  <ScanSearch className="h-4 w-4" /> 开始智能分析
                </>
              )}
            </button>
          </div>
        </div>

        {/* 右侧：结果展示 */}
        <div className="lg:col-span-8 space-y-6">
          {!data ? (
            <div className="flex h-150 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/10 bg-white/4 text-stone-400">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300">
                <ScanSearch className="h-9 w-9" />
              </div>
              <p className="font-medium text-stone-200">准备就绪，等待上传分析</p>
              <p className="mt-2 text-sm text-stone-500">分析结果会在这里以结构化面板展示</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-6">
              {/* 核心结果头部 */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-stone-950/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur">
                {isCached && (
                  <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-bold text-amber-200">
                    <Zap className="h-3.5 w-3.5" />
                    极速加载 (Redis Cache)
                  </div>
                )}
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                      Candidate Snapshot
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-stone-100">
                      {data.basic_info.name}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-400">
                      {contactItems.map(({ icon: Icon, value, accent }) => (
                        <span
                          key={value}
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${accent ? "border-amber-300/20 bg-amber-300/10 text-amber-200" : "border-white/10 bg-white/4 text-stone-300"}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center rounded-3xl border border-amber-300/25 bg-amber-300/10 px-6 py-4">
                    <span className="text-5xl font-black leading-none text-amber-200">
                      {data.match_score}
                    </span>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300/70">
                      Match Percent
                    </span>
                  </div>
                </div>
              </div>

              {/* 技能标签云 */}
              <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur">
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-500">
                  Core Skill Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-sm font-medium text-stone-200 transition-colors hover:border-amber-300/40 hover:text-amber-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 项目经验渲染 */}
              <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur">
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-500">
                  Key Projects
                </h4>
                <div className="space-y-4">
                  {data.project_experience.map((proj, i) => (
                    <div
                      key={i}
                      className="rounded-[1.25rem] border border-white/10 bg-white/4 p-4"
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <h5 className="font-semibold text-stone-100">{proj.name}</h5>
                        <span className="rounded-full border border-white/10 bg-stone-950/80 px-2.5 py-1 text-xs text-stone-400">
                          {proj.role}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-stone-300">{proj.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI 报告 & 建议 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-emerald-400/15 bg-emerald-400/8 p-6 backdrop-blur">
                  <h4 className="mb-3 flex items-center gap-2 font-bold text-emerald-200">
                    <span className="rounded-xl bg-emerald-400/15 p-1.5">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    优势分析
                  </h4>
                  <ul className="space-y-2">
                    {data.analysis_report.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-emerald-100/90">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.75rem] border border-rose-400/15 bg-rose-400/8 p-6 backdrop-blur">
                  <h4 className="mb-3 flex items-center gap-2 font-bold text-rose-200">
                    <span className="rounded-xl bg-rose-400/15 p-1.5">
                      <Scale className="h-4 w-4" />
                    </span>
                    改进点
                  </h4>
                  <ul className="space-y-2">
                    {data.analysis_report.disadvantages.map((dis, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-rose-100/90">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" />
                        {dis}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-4xl border border-white/10 bg-stone-950/90 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/4 text-amber-200">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                  <h4 className="text-lg font-bold">面试官深度建议</h4>
                </div>
                <p className="leading-relaxed italic text-stone-300">
                  "{data.analysis_report.suggestion}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
