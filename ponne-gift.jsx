import { useState } from "react";

const questions = [
  {
    id: "budget",
    label: "ご予算はどのくらいですか？",
    sub: "お気持ちに合わせてお選びください",
    options: [
      { value: "low", label: "〜3,000円", emoji: "🌷", desc: "気軽にプレゼント" },
      { value: "mid", label: "〜5,000円", emoji: "💐", desc: "ちょっと特別に" },
      { value: "high", label: "〜9,000円", emoji: "🌹", desc: "とびきり特別に" },
    ],
  },
  {
    id: "style",
    label: "お母さんのスタイルは？",
    sub: "普段のファッションに近いものをお選びください",
    options: [
      { value: "elegant", label: "上品・きれいめ", emoji: "👒", desc: "シンプルで洗練されたスタイル" },
      { value: "casual", label: "ナチュラル・カジュアル", emoji: "🌿", desc: "ナチュラルで気取らないスタイル" },
      { value: "cute", label: "かわいい・フェミニン", emoji: "🎀", desc: "花柄やピンクが好きなスタイル" },
    ],
  },
  {
    id: "use",
    label: "どんなシーンで使ってほしい？",
    sub: "プレゼントの用途をお選びください",
    options: [
      { value: "accessory", label: "毎日のおしゃれに", emoji: "✨", desc: "日常のコーデのアクセントに" },
      { value: "display", label: "お部屋に飾って", emoji: "🏡", desc: "インテリアとして眺めて楽しむ" },
      { value: "both", label: "どちらでも", emoji: "🎁", desc: "使うもよし、飾るもよし" },
    ],
  },
  {
    id: "message",
    label: "どんな想いを伝えたい？",
    sub: "ギフトに込めたいメッセージをお選びください",
    options: [
      { value: "luxury", label: "豪華に祝いたい", emoji: "🥂", desc: "いつも頑張るお母さんへ特別なものを" },
      { value: "flower", label: "花と一緒に贈りたい", emoji: "🌸", desc: "お花の温かみも添えて" },
      { value: "personal", label: "特別感を出したい", emoji: "💌", desc: "世界にひとつのパーソナルなギフト" },
    ],
  },
];

const gifts = [
  {
    id: 1,
    name: "3点セット",
    fullName: "ピアス・ネックレス・リング\n3点セット",
    price: "¥8,600",
    tag: "LUXE SET",
    tagColor: "#c8a030",
    color: "#7ee8e0",
    frameColor: "#c0c0c0",
    desc: "リング・ピアス・ネックレスが揃う贅沢なセット。PONNEの世界観を丸ごとお届け。統一感あるスタイリングで、毎日のコーデをランクアップ。",
    points: ["3点セットでお得", "毎日のおしゃれに", "ギフトBOX付き"],
    url: "https://www.creema.jp/item/20678610/detail",
    score: { budget: { high: 3, mid: 1 }, style: { elegant: 3, casual: 1, cute: 2 }, use: { accessory: 3, both: 2 }, message: { luxury: 3, personal: 1 } },
  },
  {
    id: 2,
    name: "フラワーボックス\nネックレスセット",
    fullName: "フラワーボックス＋\nネックレス 2点セット",
    price: "¥5,000",
    tag: "FLOWER",
    tagColor: "#9b7bb8",
    color: "#9b7bb8",
    frameColor: "#c0c0c0",
    desc: "紫陽花のプリザーブドフラワーとネックレスのセット。ふわりと広がる花の美しさと、上品なアクセサリーが母の日にぴったりの一箱。",
    points: ["花とアクセのセット", "母の日専用ラッピング", "特別感たっぷり"],
    url: "https://www.creema.jp/item/20649967/detail",
    score: { budget: { mid: 3, high: 1 }, style: { cute: 3, elegant: 2, casual: 2 }, use: { both: 3, display: 2, accessory: 1 }, message: { flower: 3, luxury: 1, personal: 1 } },
  },
  {
    id: 3,
    name: "イニシャル入り\n小物入れ",
    fullName: "イニシャル入り\n小物入れ",
    price: "¥3,000",
    tag: "PERSONAL",
    tagColor: "#c8a030",
    color: "#f5ede0",
    frameColor: "#c8a030",
    desc: "樹脂で作られたお花入りの小物入れ。イニシャルを入れて世界にひとつのオリジナルに。リングやピアスの収納にも◎ 眺めるたびに笑顔になれる一品。",
    points: ["名前・イニシャル入り", "お部屋に飾れる", "リーズナブル"],
    url: "https://www.creema.jp/item/19122057/detail",
    score: { budget: { low: 3, mid: 1 }, style: { elegant: 2, casual: 3, cute: 2 }, use: { display: 3, both: 2 }, message: { personal: 3, flower: 1 } },
  },
  {
    id: 4,
    name: "選べる2点\nリングセット",
    fullName: "選べる2点\nリングセット",
    price: "¥4,950",
    tag: "SELECT",
    tagColor: "#c8a030",
    color: "#f4c4a0",
    frameColor: "#c8a030",
    desc: "カラーを自由に選べるリング2点セット。たくさんのカラーバリエーションの中からお母さんの好みに合わせてカスタマイズ。重ね付けも楽しめる。",
    points: ["カラー自由に選べる", "重ね付けも楽しい", "日常使いに最適"],
    url: "https://www.creema.jp/item/20047911/detail",
    score: { budget: { mid: 3, low: 1 }, style: { casual: 3, cute: 3, elegant: 1 }, use: { accessory: 3, both: 2 }, message: { personal: 2, luxury: 1, flower: 1 } },
  },
];

function calcScores(answers) {
  return gifts.map((g) => {
    let score = 0;
    for (const [qid, val] of Object.entries(answers)) {
      score += g.score[qid]?.[val] ?? 0;
    }
    return { ...g, totalScore: score };
  }).sort((a, b) => b.totalScore - a.totalScore);
}

function RingIllust({ color, frameColor, size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <ellipse cx="18" cy="26" rx="8" ry="9" fill={color} stroke={frameColor} strokeWidth="1.5" />
      <ellipse cx="28" cy="21" rx="9" ry="10" fill={color} stroke={frameColor} strokeWidth="1.5" opacity="0.85"/>
      <ellipse cx="38" cy="26" rx="8" ry="9" fill={color} stroke={frameColor} strokeWidth="1.5" />
      <path d="M12 32 Q12 44 28 44 Q44 44 44 32 L44 28 Q44 40 28 40 Q12 40 12 28 Z" fill={frameColor} opacity="0.9"/>
      <ellipse cx="16" cy="22" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.5)" />
      <ellipse cx="26" cy="17" rx="3" ry="2" fill="rgba(255,255,255,0.5)" />
      <ellipse cx="36" cy="22" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

function NecklaceIllust({ color, size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <path d="M10 8 Q28 22 46 8" fill="none" stroke="#b0b0b0" strokeWidth="1.2" />
      <circle cx="28" cy="36" r="11" fill={color} stroke="#b0b0b0" strokeWidth="1.5" />
      <path d="M28 24 L28 26" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="25" cy="33" r="3" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

function BoxIllust({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <rect x="8" y="24" width="40" height="26" rx="3" fill="#fff0f0" stroke="#e07070" strokeWidth="1.5"/>
      <rect x="8" y="18" width="40" height="8" rx="2" fill="#ff8080" stroke="#e07070" strokeWidth="1"/>
      <line x1="28" y1="18" x2="28" y2="50" stroke="#e07070" strokeWidth="1.2"/>
      <path d="M22 18 Q28 10 34 18" fill="none" stroke="#e07070" strokeWidth="1.5"/>
      <circle cx="28" cy="10" r="2.5" fill="#e07070"/>
    </svg>
  );
}

function SmallBoxIllust({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <rect x="10" y="18" width="36" height="26" rx="4" fill="#f5ede0" stroke="#c8a030" strokeWidth="1.5"/>
      <ellipse cx="22" cy="31" rx="7" ry="6" fill="#f8d4a0" stroke="#c8a030" strokeWidth="1" opacity="0.7"/>
      <text x="30" y="34" fontSize="10" fill="#c8a030" fontFamily="serif" fontWeight="bold">A</text>
      <rect x="10" y="14" width="36" height="6" rx="2" fill="#e8c070" stroke="#c8a030" strokeWidth="1"/>
    </svg>
  );
}

const IllustMap = { 1: RingIllust, 2: NecklaceIllust, 3: SmallBoxIllust, 4: RingIllust };

export default function App() {
  const [step, setStep] = useState(0); // -1=intro, 0-3=questions, 4=result
  const [answers, setAnswers] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);
  const [expandedGift, setExpandedGift] = useState(null);
  const [phase, setPhase] = useState("intro"); // intro | quiz | result

  const ranked = phase === "result" ? calcScores(answers) : [];
  const top = ranked[0];

  function handleStart() {
    setPhase("quiz");
    setStep(0);
  }

  function handleAnswer(val) {
    const q = questions[step];
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("result");
      setExpandedGift(null);
    }
  }

  function handleReset() {
    setPhase("intro");
    setStep(0);
    setAnswers({});
    setExpandedGift(null);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff8f8 0%, #fdf4ee 50%, #f8f4ff 100%)",
      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px 48px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px);} to { opacity:1; transform:translateY(0);} }
        @keyframes popIn { from { opacity:0; transform:scale(0.92);} to { opacity:1; transform:scale(1);} }
        @keyframes shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .pop-in { animation: popIn 0.4s ease forwards; }
        .opt { transition: all 0.22s ease; cursor: pointer; }
        .opt:hover { transform: translateY(-4px) scale(1.02); }
        .gift-card { transition: all 0.28s ease; cursor: pointer; }
        .gift-card:hover { transform: translateY(-4px); }
        .carnation { animation: shimmer 3s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div className="fade-up" style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "7px", color: "#c8a030", fontFamily: "sans-serif", marginBottom: "6px" }}>
          MOTHER'S DAY
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "38px",
          fontWeight: "300",
          letterSpacing: "8px",
          color: "#2a1818",
          lineHeight: 1,
        }}>PONNE</div>
        <div style={{ width: "48px", height: "1px", background: "linear-gradient(90deg,transparent,#c8a030,transparent)", margin: "10px auto" }}/>
        <div style={{ fontSize: "12px", color: "#9a7060", fontFamily: "sans-serif", letterSpacing: "2px" }}>
          樹脂と花と色と
        </div>
      </div>

      {/* INTRO */}
      {phase === "intro" && (
        <div className="fade-up" style={{ width: "100%", maxWidth: "420px", textAlign: "center" }}>
          <div style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "40px 32px",
            boxShadow: "0 8px 40px rgba(200,140,60,0.1)",
            border: "1px solid rgba(200,160,80,0.15)",
            marginBottom: "24px",
          }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🌸</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontWeight: "400",
              color: "#2a1818",
              margin: "0 0 12px",
              lineHeight: "1.5",
            }}>あなたにぴったりの<br/>母の日ギフトを見つけよう</h2>
            <p style={{
              fontSize: "13px",
              color: "#9a7060",
              fontFamily: "sans-serif",
              lineHeight: "1.8",
              margin: "0 0 28px",
            }}>
              4つの質問に答えるだけで、<br/>
              お母さんへの最高のギフトを<br/>
              ご提案します。
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {[
                { id: 1, name: "3点セット", price: "¥8,600", color: "#7ee8e0", frameColor: "#c0c0c0" },
                { id: 2, name: "フラワーボックス＋ネックレス", price: "¥5,000", color: "#9b7bb8", frameColor: "#c0c0c0" },
                { id: 3, name: "イニシャル小物入れ", price: "¥3,000", color: "#f5ede0", frameColor: "#c8a030" },
                { id: 4, name: "選べるリングセット", price: "¥4,950", color: "#f4c4a0", frameColor: "#c8a030" },
              ].map((g) => {
                const Illust = IllustMap[g.id];
                return (
                  <div key={g.id} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 16px", background: "#faf8f5",
                    borderRadius: "12px", border: "1px solid #f0e8d8",
                  }}>
                    <Illust color={g.color} frameColor={g.frameColor} size={36} />
                    <span style={{ flex: 1, fontSize: "13px", color: "#4a3028", fontFamily: "sans-serif", textAlign: "left" }}>{g.name}</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#c8a030", fontFamily: "sans-serif" }}>{g.price}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleStart}
              style={{
                width: "100%",
                padding: "16px",
                background: "linear-gradient(135deg, #d4a820, #c07858)",
                border: "none",
                borderRadius: "14px",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "sans-serif",
                letterSpacing: "4px",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(200,120,60,0.3)",
              }}
            >
              診断スタート 🌸
            </button>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {phase === "quiz" && (
        <div className="fade-up" style={{ width: "100%", maxWidth: "420px" }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: "3px", borderRadius: "2px",
                background: i <= step ? "linear-gradient(90deg,#d4a820,#c07858)" : "#f0e0d0",
                transition: "background 0.4s",
              }} />
            ))}
          </div>

          <div style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "32px 28px",
            boxShadow: "0 8px 40px rgba(200,140,60,0.1)",
            border: "1px solid rgba(200,160,80,0.12)",
          }}>
            <div style={{
              fontSize: "11px", letterSpacing: "4px", color: "#c8a030",
              fontFamily: "sans-serif", marginBottom: "8px",
            }}>Q{step + 1} / {questions.length}</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontWeight: "400",
              color: "#2a1818",
              margin: "0 0 6px",
              lineHeight: "1.4",
            }}>{questions[step].label}</h2>
            <p style={{ fontSize: "12px", color: "#9a7060", fontFamily: "sans-serif", margin: "0 0 24px" }}>
              {questions[step].sub}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  className="opt"
                  onClick={() => handleAnswer(opt.value)}
                  onMouseEnter={() => setHoveredOption(opt.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    padding: "16px 20px",
                    background: hoveredOption === opt.value ? "linear-gradient(135deg,#fff8f0,#fff0f8)" : "#faf8f5",
                    border: hoveredOption === opt.value ? "2px solid #c8a030" : "2px solid #f0e8d8",
                    borderRadius: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    textAlign: "left",
                    boxShadow: hoveredOption === opt.value ? "0 6px 20px rgba(200,140,60,0.15)" : "none",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{opt.emoji}</span>
                  <div>
                    <div style={{ fontSize: "15px", color: "#2a1818", fontFamily: "sans-serif", fontWeight: "600", marginBottom: "2px" }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: "12px", color: "#9a7060", fontFamily: "sans-serif" }}>
                      {opt.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                width: "100%", padding: "12px", background: "transparent",
                border: "none", color: "#9a7060", fontSize: "13px",
                fontFamily: "sans-serif", cursor: "pointer", marginTop: "12px",
                letterSpacing: "1px",
              }}
            >← もどる</button>
          )}
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && (
        <div style={{ width: "100%", maxWidth: "460px" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🌸</div>
            <div style={{ fontSize: "11px", letterSpacing: "5px", color: "#c8a030", fontFamily: "sans-serif", marginBottom: "6px" }}>
              YOUR PERFECT GIFT
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "24px", fontWeight: "400", color: "#2a1818",
              margin: "0 0 6px", letterSpacing: "1px",
            }}>あなたへのおすすめギフト</h2>
            <p style={{ fontSize: "12px", color: "#9a7060", fontFamily: "sans-serif", margin: 0 }}>
              スコアの高い順に表示しています
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {ranked.map((gift, idx) => {
              const Illust = IllustMap[gift.id];
              const isTop = idx === 0;
              const isExpanded = expandedGift === gift.id;
              return (
                <div
                  key={gift.id}
                  className="gift-card pop-in"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0,
                    background: "#fff",
                    borderRadius: "20px",
                    border: isTop ? "2px solid #c8a030" : "2px solid transparent",
                    boxShadow: isTop ? "0 8px 32px rgba(200,140,60,0.18)" : "0 4px 16px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  onClick={() => setExpandedGift(isExpanded ? null : gift.id)}
                >
                  {isTop && (
                    <div style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: "linear-gradient(135deg,#d4a820,#c07858)",
                      color: "#fff", fontSize: "10px", fontFamily: "sans-serif",
                      padding: "3px 10px", borderRadius: "20px", letterSpacing: "2px",
                    }}>BEST MATCH ✨</div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", padding: "20px 20px", gap: "16px" }}>
                    <div style={{
                      width: "64px", height: "64px",
                      background: `${gift.color}30`,
                      borderRadius: "16px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Illust color={gift.color} frameColor={gift.frameColor} size={50} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: "inline-block",
                        background: `${gift.tagColor}18`,
                        color: gift.tagColor,
                        fontSize: "9px", fontFamily: "sans-serif",
                        padding: "2px 8px", borderRadius: "20px", letterSpacing: "2px",
                        marginBottom: "5px",
                      }}>{gift.tag}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "17px", color: "#2a1818",
                        whiteSpace: "pre-line", lineHeight: "1.3", marginBottom: "4px",
                      }}>{gift.fullName}</div>
                      <div style={{ fontSize: "16px", color: "#c8a030", fontFamily: "sans-serif", fontWeight: "700" }}>
                        {gift.price}
                      </div>
                    </div>
                    <div style={{
                      fontSize: "14px", color: "#c8a030",
                      transition: "transform 0.3s",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                      flexShrink: 0,
                    }}>▼</div>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f5ede0", paddingTop: "16px" }}>
                      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                        {gift.points.map((p) => (
                          <span key={p} style={{
                            fontSize: "11px", padding: "3px 10px",
                            background: "#f5ede0", borderRadius: "20px",
                            color: "#9a7040", fontFamily: "sans-serif",
                          }}>✔ {p}</span>
                        ))}
                      </div>
                      <p style={{
                        fontSize: "13px", color: "#6a4838",
                        fontFamily: "sans-serif", lineHeight: "1.9", margin: "0 0 16px",
                      }}>{gift.desc}</p>
                      <a
                        href={gift.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "block",
                          width: "100%", padding: "13px",
                          background: "linear-gradient(135deg,#d4a820,#c07858)",
                          borderRadius: "10px",
                          color: "#fff", fontSize: "13px",
                          fontFamily: "sans-serif", letterSpacing: "3px",
                          cursor: "pointer", textDecoration: "none",
                          textAlign: "center",
                          boxShadow: "0 4px 14px rgba(200,120,60,0.3)",
                        }}
                      >
                        このギフトを選ぶ 🌸
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleReset}
            style={{
              width: "100%", padding: "14px",
              background: "transparent",
              border: "1px solid #e0d0c0",
              borderRadius: "14px", color: "#9a7060",
              fontSize: "13px", fontFamily: "sans-serif",
              cursor: "pointer", marginTop: "20px", letterSpacing: "2px",
            }}
          >← もう一度診断する</button>
        </div>
      )}
    </div>
  );
}
