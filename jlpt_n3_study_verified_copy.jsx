import { useState, useMemo, useEffect } from "react";

/* ─── STYLES ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=BIZ+UDPMincho:wght@400;700&family=Noto+Sans+KR:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap');
:root{--bg:#0d1117;--bg2:#161b22;--bg3:#21262d;--bg4:#2d333b;--or:#f97316;--or2:#c2410c;--gn:#22c55e;--rd:#f85149;--bl:#58a6ff;--gd:#fbbf24;--tx:#e6edf3;--tx2:#8b949e;--tx3:#6e7681;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg);color:var(--tx);font-family:'Noto Sans KR','Noto Sans JP',sans-serif;min-height:100vh;}
.app{max-width:500px;margin:0 auto;padding-bottom:40px;min-height:100vh;}
ruby{display:inline-ruby;ruby-align:center;}
rt{font-size:0.6em;color:var(--tx2);font-family:'BIZ UDPMincho',serif;line-height:1.2;}
.home-hdr{padding:48px 24px 24px;text-align:center;}
.home-logo{font-size:64px;line-height:1;}
.home-title{font-size:22px;font-weight:900;color:var(--or);letter-spacing:3px;margin-top:12px;}
.home-sub{font-size:13px;color:var(--tx2);margin-top:6px;line-height:1.6;}
.lesson-card{display:flex;align-items:center;background:var(--bg2);border:2px solid var(--bg3);border-radius:16px;padding:20px;margin:10px 16px;cursor:pointer;transition:all .2s;gap:16px;}
.lesson-card:hover{border-color:var(--or);transform:translateX(4px);background:var(--bg3);}
.lesson-badge{width:56px;height:56px;background:var(--or);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#fff;flex-shrink:0;}
.lesson-badge.l2{background:#7c3aed;}
.lesson-badge.l3{background:#0ea5e9;}
.lesson-badge.l4{background:#059669;}
.lesson-info{flex:1;}
.lesson-name{font-size:15px;font-weight:700;}
.lesson-year{font-size:12px;color:var(--tx2);margin-top:3px;}
.lesson-wc{font-size:12px;color:var(--or);margin-top:5px;font-weight:500;}
.nav{display:flex;align-items:center;padding:12px 16px;gap:8px;border-bottom:1px solid var(--bg3);}
.nav-back{background:var(--bg3);border:none;color:var(--tx2);padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;}
.nav-back:hover{color:var(--tx);}
.nav-title{font-size:15px;font-weight:700;flex:1;}
.nav-sub{font-size:12px;color:var(--tx2);}
.menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px;}
.menu-cell{background:var(--bg2);border:2px solid var(--bg3);border-radius:14px;padding:20px 16px;cursor:pointer;text-align:center;transition:all .2s;}
.menu-cell:hover{border-color:var(--or);background:var(--bg3);}
.menu-cell.full{grid-column:1/-1;}
.menu-cell.danger{border-color:#5a1d1d;}
.menu-cell.danger:hover{border-color:var(--rd);}
.menu-icon{font-size:30px;margin-bottom:8px;}
.menu-label{font-size:13px;font-weight:700;}
.menu-hint{font-size:11px;color:var(--tx2);margin-top:3px;}
.menu-badge{display:inline-block;background:var(--rd);color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:10px;margin-left:6px;}
.fc-wrap{padding:16px;}
.fc-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:8px;flex-wrap:wrap;}
.fc-counter{font-size:14px;color:var(--tx2);}
.fc-filter{display:flex;gap:6px;flex-wrap:wrap;}
.fc-filter-btn{background:var(--bg3);border:1px solid var(--bg4);color:var(--tx2);padding:6px 10px;border-radius:8px;cursor:pointer;font-size:11px;}
.fc-filter-btn.active{background:var(--or);border-color:var(--or);color:#fff;}
.fc-card{background:var(--bg2);border:2px solid var(--bg3);border-radius:20px;min-height:260px;cursor:pointer;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:28px 24px;transition:all .3s;user-select:none;}
.fc-card:active{transform:scale(.97);}
.fc-card.flipped{border-color:var(--or);}
.fc-kanji{font-family:'BIZ UDPMincho',serif;font-size:52px;font-weight:600;line-height:1.2;}
.fc-small{font-size:28px;}
.fc-hira{font-size:18px;color:var(--or);margin-top:10px;font-weight:500;}
.fc-korean{font-size:22px;font-weight:700;margin-top:8px;}
.fc-tap{font-size:12px;color:var(--tx3);position:absolute;bottom:14px;right:16px;}
.fc-imp{display:inline-block;background:var(--gd);color:#000;font-size:10px;font-weight:700;padding:3px 8px;border-radius:8px;margin-bottom:8px;}
.fc-hint-btn{margin-top:14px;padding:7px 16px;background:transparent;border:1px solid var(--or);color:var(--or);border-radius:20px;cursor:pointer;font-size:12px;transition:all .2s;}
.fc-hint-btn:hover{background:var(--or);color:#fff;}
.fc-hint{background:var(--bg3);border-radius:10px;padding:10px 14px;margin-top:10px;font-size:13px;color:var(--tx2);line-height:1.7;max-width:100%;}
.fc-actions{display:flex;gap:12px;margin-top:16px;}
.fc-action{flex:1;padding:13px;border-radius:12px;cursor:pointer;font-size:14px;font-weight:700;border:none;transition:all .2s;}
.fc-action.miss{background:#2a1010;color:var(--rd);border:1.5px solid var(--rd);}
.fc-action.miss:hover{background:#3d1515;}
.fc-action.hit{background:#0d2818;color:var(--gn);border:1.5px solid var(--gn);}
.fc-action.hit:hover{background:#122a1e;}
.qz-wrap{padding:16px;}
.qz-prog{display:flex;gap:3px;margin-bottom:12px;}
.qz-prog-seg{flex:1;height:4px;background:var(--bg3);border-radius:2px;transition:background .3s;}
.qz-prog-seg.correct{background:var(--gn);}
.qz-prog-seg.wrong{background:var(--rd);}
.qz-card{background:var(--bg2);border:2px solid var(--bg3);border-radius:16px;padding:24px;margin-bottom:14px;text-align:center;}
.qz-type{font-size:11px;color:var(--or);font-weight:700;letter-spacing:1.5px;margin-bottom:10px;}
.qz-word{font-family:'BIZ UDPMincho',serif;font-size:44px;font-weight:600;line-height:1.3;}
.qz-word.hira{font-family:'BIZ UDPMincho',serif;font-size:30px;}
.qz-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.qz-opt{background:var(--bg3);border:2px solid transparent;border-radius:12px;padding:14px 10px;cursor:pointer;font-size:14px;font-weight:500;transition:all .2s;text-align:center;line-height:1.5;min-height:54px;display:flex;align-items:center;justify-content:center;}
.qz-opt:hover:not([data-disabled]){border-color:var(--or);background:var(--bg4);}
.qz-opt.correct{border-color:var(--gn);background:#0d2818;color:var(--gn);}
.qz-opt.wrong{border-color:var(--rd);background:#2a1010;color:var(--rd);}
.qz-feedback{background:var(--bg3);border-radius:10px;padding:12px 16px;margin-top:12px;font-size:13px;line-height:1.7;}
.qz-score{text-align:center;padding:48px 24px;}
.score-emoji{font-size:64px;}
.score-big{font-size:56px;font-weight:900;color:var(--or);margin:12px 0;}
.score-pct{font-size:16px;color:var(--tx2);}
.score-row{display:flex;gap:32px;justify-content:center;margin:24px 0;}
.score-item .num{font-size:28px;font-weight:700;}
.score-item .lbl{font-size:12px;color:var(--tx2);margin-top:2px;}
.score-item .num.g{color:var(--gn);}
.score-item .num.r{color:var(--rd);}
.prac-sets{padding:16px;}
.prac-set-card{background:var(--bg2);border:2px solid var(--bg3);border-radius:12px;padding:16px 18px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:all .2s;}
.prac-set-card:hover{border-color:var(--or);}
.prac-num-badge{width:44px;height:44px;background:var(--bg3);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:var(--or);}
.prac-set-title{font-size:15px;font-weight:700;}
.prac-set-score{font-size:12px;color:var(--tx2);margin-top:3px;}
.prac-q-wrap{padding:12px 16px;}
.prac-q{background:var(--bg2);border-radius:14px;padding:18px;margin-bottom:14px;}
.prac-q-num{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.prac-q-n{width:26px;height:26px;background:var(--or);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
.prac-imp{font-size:10px;background:var(--gd);color:#000;padding:2px 7px;border-radius:6px;font-weight:700;}
.prac-sent{font-size:15px;line-height:2.4;margin-bottom:12px;font-family:'BIZ UDPMincho',serif;}
.prac-ul{border-bottom:2px solid var(--or);padding-bottom:1px;font-weight:700;color:var(--or);}
.prac-opts{display:grid;grid-template-columns:1fr;gap:7px;}
.prac-opt{background:var(--bg3);border:2px solid transparent;border-radius:10px;padding:12px 16px;cursor:pointer;font-size:16px;font-family:"BIZ UDPMincho",serif;transition:all .2s;text-align:left;display:flex;align-items:center;gap:10px;}
.prac-opt:hover:not([data-disabled]){border-color:var(--or);}
.prac-opt.correct{border-color:var(--gn);background:#0d2818;color:var(--gn);font-weight:700;}
.prac-opt.wrong{border-color:var(--rd);background:#2a1010;color:var(--rd);}
.prac-result{background:var(--bg4);border-radius:8px;padding:8px 12px;margin-top:10px;font-size:12px;color:var(--tx2);}
.wr-list{padding:16px;}
.wr-item{background:var(--bg2);border:1px solid var(--bg3);border-radius:12px;padding:16px;margin-bottom:10px;display:flex;align-items:center;gap:16px;}
.wr-kanji{font-family:'BIZ UDPMincho',serif;font-size:26px;font-weight:600;min-width:60px;text-align:center;}
.wr-info{flex:1;}
.wr-hira{font-size:13px;color:var(--or);font-weight:500;}
.wr-kr{font-size:16px;font-weight:700;margin-top:3px;}
.btn{padding:14px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;border:none;width:100%;}
.btn-or{background:var(--or);color:#fff;}
.btn-or:hover{background:var(--or2);}
.btn-ghost{background:transparent;color:var(--tx2);border:2px solid var(--bg3);}
.btn-ghost:hover{border-color:var(--tx2);color:var(--tx);}
.mt8{margin-top:8px;}
.mt16{margin-top:16px;}
.empty{text-align:center;padding:60px 20px;color:var(--tx2);}
.empty-icon{font-size:48px;margin-bottom:12px;}
.empty-text{font-size:15px;}
.qz-info-bar{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--tx2);margin-bottom:12px;}
.random-badge{display:inline-block;background:linear-gradient(135deg,#f97316,#a855f7);color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;margin-left:8px;}
.qz-timer{display:flex;align-items:center;gap:8px;}
.qz-timer-bar{flex:1;height:6px;background:var(--bg3);border-radius:3px;overflow:hidden;}
.qz-timer-fill{height:100%;border-radius:3px;transition:width .1s linear;}
.qz-timer-num{font-size:13px;font-weight:700;min-width:20px;text-align:right;}
.prac-meaning{background:var(--bg4);border-left:3px solid var(--bl);border-radius:6px;padding:8px 12px;margin-top:8px;font-size:12px;color:var(--tx2);line-height:1.6;}
`;

/* ─── FURIGANA RENDERER ──────────────────────────────────────────── */
// {漢字|ふりがな} 표기를 파싱해서 <ruby>로 렌더링
function RubyText({ text }) {
  if (!text) return null;
  const parts = text.split(/(\{[^|{}]+\|[^|{}]+\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\{([^|]+)\|([^}]+)\}$/);
        if (m) {
          return (
            <ruby key={i}>
              {m[1]}
              <rt>{m[2]}</rt>
            </ruby>
          );
        }
        return part ? <span key={i}>{part}</span> : null;
      })}
    </>
  );
}

// 밑줄 친 단어 + 나머지 후리가나를 함께 렌더링
function renderSentence(sent, ul) {
  if (!ul || !sent) return <RubyText text={sent} />;
  const idx = sent.indexOf(ul);
  if (idx !== -1) {
    return (
      <>
        {sent.slice(0, idx) && <RubyText text={sent.slice(0, idx)} />}
        <span className="prac-ul">{ul}</span>
        {sent.slice(idx + ul.length) && <RubyText text={sent.slice(idx + ul.length)} />}
      </>
    );
  }
  let regexStr = '';
  for (const ch of ul) {
    const esc = ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    regexStr += `(?:\\{${esc}\\|[^|{}]+\\}|${esc})`;
  }
  try {
    const regex = new RegExp(regexStr);
    const match = sent.match(regex);
    if (match) {
      const mIdx = sent.indexOf(match[0]);
      const before = sent.slice(0, mIdx);
      const after = sent.slice(mIdx + match[0].length);
      return (
        <>
          {before && <RubyText text={before} />}
          <span className="prac-ul">{ul}</span>
          {after && <RubyText text={after} />}
        </>
      );
    }
  } catch (e) {}
  return <RubyText text={sent} />;
}

/* ─── DATA: 1과 VOCAB (기출어휘 2016~2024, 다락원 N3 한권으로 끝내기 p.15~18) ──
   형식: [표기, 히라가나, 한국어의미, 암기힌트, 출제빈도높음?] ───────────── */
const V1 = [
  ['返す','かえす','돌려주다','反(돌이킬 반)+す → 되돌려 주다 🔄',false],
  ['感情的','かんじょうてき','감정적','感(느낄 감)+情(뜻 정)+的(~적) → 느낌에 좌우되는 😢',false],
  ['最初','さいしょ','최초, 처음','最(가장 최)+初(처음 초) → 가장 처음',false],
  ['適当だ','てきとうだ','적당하다','適(맞을 적)+当(마땅 당) → 딱 알맞다 👍',false],
  ['父母','ふぼ','부모','父(아비 부)+母(어미 모) → 부모',false],
  ['割る','わる','나누다, 쪼개다, 깨뜨리다','칼로 물건을 갈라 나누는 모양 🔨',false],
  ['疑う','うたがう','의심하다','비수(匕)처럼 마음이 날카로워져 의심하다 🤔',false],
  ['高価','こうか','고가','高(높을 고)+価(값 가) → 값이 높음 💰',false],
  ['産業','さんぎょう','산업','産(낳을 산)+業(업 업) → 물건을 만들어내는 일 🏭',false],
  ['朝刊','ちょうかん','조간','朝(아침 조)+刊(펴낼 간) → 아침에 나오는 신문 📰',false],
  ['復習','ふくしゅう','복습','復(다시 복)+習(익힐 습) → 다시 익히다 📖',false],
  ['留守','るす','부재중','留(머물 류)+守(지킬 수) → 집을 비운 채 지킴 🚪',false],
  ['裏','うら','뒤, 뒷면','겉과 반대되는 안쪽·뒷면',false],
  ['小型','こがた','소형','小(작을 소)+型(모형 형) → 작은 크기',false],
  ['選手','せんしゅ','선수','選(가릴 선)+手(사람 수) → 뽑힌 사람 🏅',false],
  ['広場','ひろば','광장','広(넓을 광)+場(마당 장) → 넓은 마당',false],
  ['細い','ほそい','좁다, 가늘다','실(糸)처럼 가늘게 이어진 모양',false],
  ['汚す','よごす','더럽히다','氵(물 수) → 물이 더러워지다 💧',false],
  ['比べる','くらべる','비교하다','두 사람(比)이 나란히 서서 견주다',false],
  ['件','けん','건','사람(人)이 소(牛)를 세듯 하나씩 세는 단위',false],
  ['難しい','むずかしい','어렵다','진흙탕에 새가 빠진 듯 힘든 상황 😖',false],
  ['容器','ようき','용기(그릇)','容(담을 용)+器(그릇 기) → 담는 그릇',false],
  ['角','かど','모퉁이','짐승 뿔(角)처럼 튀어나온 모퉁이',false],
  ['計算','けいさん','계산','計(셀 계)+算(셈 산) → 셈하다 🔢',false],
  ['情報','じょうほう','정보','情(뜻 정)+報(알릴 보) → 알려주는 소식',false],
  ['現在','げんざい','현재','現(나타날 현)+在(있을 재) → 지금 있는 시점 ⏰',false],
  ['複数','ふくすう','복수(여러 개)','複(겹칠 복)+数(셀 수) → 여러 개의 수',false],
  ['夕日','ゆうひ','석양','夕(저녁 석)+日(해 일) → 저녁 해 🌇',false],
  ['悲しい','かなしい','슬프다','非(아닐 비)+心(마음 심) → 마음이 아니다=슬프다 😢',false],
  ['自然','しぜん','자연','自(스스로 자)+然(그러할 연) → 스스로 그러한 것 🌿',false],
  ['通知','つうち','통지','通(통할 통)+知(알 지) → 알려서 통하게 함 📩',false],
  ['逃げる','にげる','도망치다, 달아나다','辶(달릴 착)+兆(조짐 조) → 낌새 채고 달아나다 🏃',false],
  ['秒','びょう','초(시간)','禾(벼 화)+少(적을 소) → 아주 작은 시간 단위 ⏱️',false],
  ['過去','かこ','과거','過(지날 과)+去(갈 거) → 지나가 버린 시간',false],
  ['呼吸','こきゅう','호흡','呼(부를 호)+吸(마실 흡) → 내쉬고 들이마심 🌬️',false],
  ['駐車','ちゅうしゃ','주차','駐(머무를 주)+車(수레 차) → 차를 세워둠 🚗',false],
  ['努力','どりょく','노력','努(힘쓸 노)+力(힘 력) → 힘써 애씀 💪',false],
  ['生える','はえる','나다, 자라다','生(날 생)+える → 싹이 돋아나다 🌱',false],
  ['残り','のこり','나머지','歹(부서질 알)+戔(적을 잔) → 남은 부분',false],
  ['郵送','ゆうそう','우송','郵(우편 우)+送(보낼 송) → 우편으로 보냄 📮',false],
  ['預ける','あずける','맡기다','予(미리 예)+頁(머리 혈) → 미리 맡겨두다',false],
  ['交流','こうりゅう','교류','交(사귈 교)+流(흐를 류) → 서로 오가며 사귐 🤝',false],
  ['普通','ふつう','보통, 대개','普(널리 보)+通(통할 통) → 널리 통하는 흔한 것',false],
  ['各駅','かくえき','각 역','各(각각 각)+駅(역 역) → 하나하나의 역 🚉',false],
  ['遅い','おそい','늦다','辶(달릴 착) → 발걸음이 느릿느릿 늦다 🐌',false],
  ['腰','こし','허리','月(몸 육)+要(중요할 요) → 몸의 중요한 부분, 허리',false],
  ['助ける','たすける','돕다, 살리다','且(또 차)+力(힘 력) → 힘을 보태 돕다 🤲',false],
  ['郵便','ゆうびん','우편','郵(우편 우)+便(편할 편) → 편지를 보내는 제도 ✉️',false],
  ['方角','ほうがく','방위, 방향','方(모 방)+角(뿔 각) → 방향을 가리키는 각도 🧭',false],
  ['予約','よやく','예약','予(미리 예)+約(맺을 약) → 미리 약속함 📅',false],
  ['印象','いんしょう','인상','印(도장 인)+象(코끼리 상) → 마음에 도장처럼 찍힌 느낌',false],
  ['上品だ','じょうひんだ','고상하다','上(위 상)+品(물건 품) → 품격이 높다 ✨',false],
  ['昼食','ちゅうしょく','중식, 점심식사','昼(낮 주)+食(먹을 식) → 낮에 먹는 밥 🍱',false],
  ['調査','ちょうさ','조사','調(고를 조)+査(살필 사) → 자세히 살펴봄 🔍',false],
  ['未来','みらい','미래','未(아닐 미)+来(올 래) → 아직 오지 않은 때',false],
  ['若い','わかい','젊다','艹(풀 초)+右(오른쪽 우) → 어린 풀처럼 젊다 🌱',false],
  ['改札','かいさつ','개찰구','改(고칠 개)+札(패 찰) → 표를 확인하는 곳 🚪',false],
  ['休日','きゅうじつ','휴일','休(쉴 휴)+日(날 일) → 쉬는 날 🏖️',false],
  ['塩','しお','소금','土(흙 토)+皿(그릇 명) → 그릇에 담긴 소금',false],
  ['卒業','そつぎょう','졸업','卒(마칠 졸)+業(업 업) → 학업을 마침 🎓',false],
  ['部分','ぶぶん','부분','部(떼 부)+分(나눌 분) → 나누어진 한 조각',false],
  ['機械','きかい','기계','木(나무 목)+幾(몇 기) → 나무를 짜맞춘 장치 ⚙️',false],
  ['恋しい','こいしい','그립다','亦(또 역)+心(마음 심) → 마음이 자꾸 향해 그립다 💭',false],
  ['相談','そうだん','상담','相(서로 상)+談(말씀 담) → 서로 이야기를 나눔 💬',false],
  ['得意だ','とくいだ','자신있다, 잘하다','得(얻을 득)+意(뜻 의) → 뜻한 바를 잘 얻어냄 😎',false],
  ['下線','かせん','밑줄','下(아래 하)+線(줄 선) → 아래에 그은 줄',false],
  ['主要だ','しゅようだ','주요하다','主(주인 주)+要(중요할 요) → 주된 핵심',false],
  ['直接','ちょくせつ','직접','直(곧을 직)+接(이을 접) → 곧바로 이어짐',false],
  ['結ぶ','むすぶ','잇다, 매다, 묶다','糸(실 사)+吉(길할 길) → 실로 매듭짓다 🎀',false],
  ['回す','まわす','돌리다, 회전시키다','回(돌 회)+す → 빙글빙글 돌리다 🔄',false],
  ['位置','いち','위치','位(자리 위)+置(둘 치) → 자리에 두는 곳 📍',false],
  ['汚い','きたない','더럽다','氵(물 수) → 물이 더러워짐',false],
  ['転ぶ','ころぶ','넘어지다','車(수레 차)가 구르듯 넘어지다',false],
  ['商品','しょうひん','상품','商(장사 상)+品(물건 품) → 파는 물건 🛒',false],
  ['冷える','ひえる','식다','冫(얼음 빙)+令(명령 령) → 차갑게 식다 🧊',false],
  ['燃える','もえる','타다','火(불 화)+然(그러할 연) → 불이 타오르다 🔥',false],
  ['共通','きょうつう','공통','共(함께 공)+通(통할 통) → 함께 통하는 것',false],
  ['個人','こじん','개인','個(낱 개)+人(사람 인) → 한 사람 한 사람',false],
  ['観客','かんきゃく','관객','観(볼 관)+客(손 객) → 보러 온 손님 🎭',false],
  ['訓練','くんれん','훈련','訓(가르칠 훈)+練(익힐 련) → 가르쳐서 익히게 함 🏋️',false],
  ['到着','とうちゃく','도착','到(이를 도)+着(붙을 착) → 다다라서 닿음 🏁',false],
  ['測る','はかる','재다, 달다','氵(물 수)+則(법칙 칙) → 정확히 헤아려 재다 📏',false],
  ['豆','まめ','콩','콩깍지 속에 콩이 든 모양 🫘',false],
  ['方向','ほうこう','방향','方(모 방)+向(향할 향) → 향하는 쪽 🧭',false],
  ['申し込み','もうしこみ','신청','申(아뢸 신)+込む(담다) → 뜻을 담아 아룀 📝',false],
  ['包む','つつむ','싸다, 포장하다','물건을 감싸듯 싸다 🎁',false],
  ['血圧','けつあつ','혈압','血(피 혈)+圧(누를 압) → 피가 혈관을 누르는 힘 🩺',false],
  ['制服','せいふく','제복, 교복','制(마를 제)+服(옷 복) → 정해진 옷 👔',false],
  ['早退','そうたい','조퇴','早(이를 조)+退(물러날 퇴) → 일찍 물러나다',false],
];

/* ─── DATA: 1과 확인문제 (다락원 N3 한권으로 끝내기 p.19~25, 문제1~7 각 10문항) ──
   형식: [문장, 밑줄단어, [[읽기,한국어라벨]x4], 정답인덱스(0-based), 중요도, 전체해석] ─── */
const P1 = [
  { id:1, title:'확인문제 1', qs:[
    ['その町の人口を調査します。','調査',[['ちょうさ','조사 ✅'],['ちょうさつ','★오독'],['ちょさ','★오독'],['ちょさつ','★오독']],0,false,'그 마을의 인구를 조사합니다.'],
    ['入り口でコートを預けた。','預けた',[['あすけた','★오독'],['とどけた','전달했다/신고했다'],['あずけた','맡겼다 ✅'],['ととけた','★오독']],2,false,'입구에서 코트를 맡겼다.'],
    ['わたしの家の裏は幼稚園です。','裏',[['うら','뒤 ✅'],['よこ','옆'],['かげ','그림자'],['そば','옆, 곁']],0,false,'우리 집 뒤는 유치원입니다.'],
    ['若く見られることはいいことばかりではない。','若く',[['さむく','춥게'],['わかく','젊게 ✅'],['こわく','무섭게'],['わるく','나쁘게']],1,false,'젊어 보이는 것이 좋은 것만은 아니다.'],
    ['留学について両親に相談した。','相談',[['しょうだん','★오독'],['しょうたん','★오독'],['そうだん','상담 ✅'],['そうたん','★오독']],2,false,'유학에 대해 부모님과 상담했다.'],
    ['そういう命令するような言い方はやめてほしい。','命令',[['めれん','★오독'],['めいれん','★오독'],['めれい','★오독'],['めいれい','명령 ✅']],3,false,'그런 명령하는 듯한 말투는 그만했으면 한다.'],
    ['これはよく燃えます。','燃えます',[['にえます','끓습니다'],['ひえます','식습니다'],['きえます','꺼집니다'],['もえます','탑니다 ✅']],3,false,'이것은 잘 탑니다.'],
    ['重要な所に赤で下線を引いてください。','下線',[['かせん','밑줄 ✅'],['かぜん','★오독'],['げせん','★오독'],['げぜん','★오독']],0,false,'중요한 곳에 빨간색으로 밑줄을 그으세요.'],
    ['会費は山下くんに払ってください。','払って',[['ひろって','주워서'],['くばって','나눠줘서'],['はらって','지불해서 ✅'],['かぞって','★오독']],2,false,'회비는 야마시타 군에게 지불하세요.'],
    ['これは個人の力でできるものではない。','個人',[['こうじん','★오독'],['こじん','개인 ✅'],['こにん','★오독'],['こうにん','공인, 후임']],1,false,'이것은 개인의 힘으로 할 수 있는 것이 아니다.'],
  ]},
  { id:2, title:'확인문제 2', qs:[
    ['この店はケーキの種類が多い。','種類',[['しゅるい','종류 ✅'],['じゅるい','★오독'],['しゅうるい','★오독'],['じゅうるい','★오독']],0,false,'이 가게는 케이크 종류가 많다.'],
    ['わたしは自分の目を疑った。','疑った',[['ことわった','거절했다'],['うたがった','의심했다 ✅'],['きらった','싫어했다'],['おこった','화냈다']],1,false,'나는 내 눈을 의심했다.'],
    ['「結婚なんかしない」と言ったら母は悲しそうだった。','悲しそう',[['やさしそう','다정할 것 같다'],['さびしそう','외로울 것 같다'],['かなしそう','슬퍼 보인다 ✅'],['うれしそう','기쁠 것 같다']],2,false,'"결혼 같은 거 안 해"라고 말했더니 어머니는 슬퍼 보였다.'],
    ['彼は市長を助けて市政を再建した。','助けて',[['うけて','받아서'],['たすけて','도와서 ✅'],['とどけて','전달해서/신고해서'],['かたづけて','정리해서']],1,false,'그는 시장을 도와 시정을 재건했다.'],
    ['今は遊ぶ気分じゃない。','遊ぶ',[['よぶ','부르다'],['あそぶ','놀다 ✅'],['まなぶ','배우다'],['さけぶ','외치다']],1,false,'지금은 놀 기분이 아니다.'],
    ['山田さんはときどき休日出勤します。','休日',[['しゅくじつ','★오독'],['きゅうじつ','휴일 ✅'],['きゅうにち','★오독'],['しゅくにち','★오독']],1,false,'야마다 씨는 가끔 휴일 출근을 합니다.'],
    ['母は店の売り上げを計算している。','計算',[['けいさん','계산 ✅'],['けいざん','★오독'],['けいがく','★오독'],['けいかく','계획']],0,false,'어머니는 가게 매출을 계산하고 있다.'],
    ['このビールはまだ冷えていないよ。','冷えて',[['ひえて','식어서 ✅'],['うえて','★오독'],['もえて','타서'],['にえて','끓어서']],0,false,'이 맥주는 아직 안 차가워졌어.'],
    ['彼はパイロットになるための訓練を受けた。','訓練',[['ぐんれい','★오독'],['くんれい','훈령'],['ぐんれん','★오독'],['くんれん','훈련 ✅']],3,false,'그는 파일럿이 되기 위한 훈련을 받았다.'],
    ['チケットの申し込みをインターネットで行った。','申し込み',[['もしくみ','★오독'],['もうしこみ','신청 ✅'],['とうこみ','★오독'],['もうしくみ','★오독']],1,false,'티켓 신청을 인터넷으로 했다.'],
  ]},
  { id:3, title:'확인문제 3', qs:[
    ['岩の多い山に登りました。','岩',[['かい','조개, 회'],['いわ','바위 ✅'],['すな','모래'],['どろ','진흙']],1,false,'바위가 많은 산에 올랐습니다.'],
    ['しばらく旅行で留守にします。','留守',[['りゅうす','★오독'],['しゅうしゅ','★오독'],['るす','부재중 ✅'],['しょうらい','장래']],2,false,'당분간 여행으로 집을 비웁니다.'],
    ['未来には人類は月に住むようになるかもしれない。','未来',[['みらい','미래 ✅'],['みくる','★오독'],['しょうらい','장래'],['しょうき','★오독']],0,false,'미래에는 인류가 달에 살게 될지도 모른다.'],
    ['この列車は各駅に停車する。','各駅',[['かくえき','각 역 ✅'],['がくえき','★오독'],['きゃくえき','★오독'],['ぎゃくえき','★오독']],0,false,'이 열차는 각 역에 정차한다.'],
    ['窓を開けて空気を換えてください。','換えて',[['くわえて','더해서'],['つかまえて','붙잡아서'],['つたえて','전달해서'],['かえて','바꿔서 ✅']],3,false,'창문을 열고 공기를 바꿔 주세요.'],
    ['山本さんは数学が得意です。','得意',[['とうい','★오독'],['どうい','동의'],['とくい','자신있음 ✅'],['どくい','★오독']],2,false,'야마모토 씨는 수학을 잘합니다.'],
    ['これをリボンで結んでください。','結んで',[['たたんで','접어서'],['むすんで','묶어서 ✅'],['つつんで','포장해서'],['ならんで','줄서서']],1,false,'이것을 리본으로 묶어 주세요.'],
    ['川の水はごみで汚くなっています。','汚く',[['せまく','좁게'],['うるさく','시끄럽게'],['くさく','냄새나게'],['きたなく','더럽게 ✅']],3,false,'강물이 쓰레기로 더러워지고 있습니다.'],
    ['その国は税金が高い。','税金',[['せいきん','★오독'],['せっきん','★오독'],['ぜいきん','세금 ✅'],['ぞっきん','★오독']],2,false,'그 나라는 세금이 높다.'],
    ['姉は親から独立して生活を立てている。','独立',[['どくりつ','독립 ✅'],['どくりゅう','★오독'],['とくりつ','★오독'],['とくりゅう','★오독']],0,false,'언니(누나)는 부모로부터 독립해서 생활하고 있다.'],
  ]},
  { id:4, title:'확인문제 4', qs:[
    ['この絵を見て強い印象を受けた。','印象',[['いんしょう','인상 ✅'],['いんしょ','★오독'],['いんぞう','★오독'],['いんそう','★오독']],0,false,'이 그림을 보고 강한 인상을 받았다.'],
    ['あの人たちとは交流がない。','交流',[['ごうりゅ','★오독'],['こうりゅう','교류 ✅'],['ごうりゅう','★오독'],['こうりゅ','★오독']],1,false,'저 사람들과는 교류가 없다.'],
    ['ぼくはどんなけんかにも勝ったことがない。','勝った',[['かった','이겼다 ✅'],['かざった','꾸몄다'],['おった','부러뜨렸다'],['のこった','남았다']],0,false,'나는 어떤 싸움에도 이긴 적이 없다.'],
    ['駐車は30分以内です。','駐車',[['しゅうしゃ','★오독'],['しゅしゃ','★오독'],['ちゅうしゃ','주차 ✅'],['ちゅしゃ','★오독']],2,false,'주차는 30분 이내입니다.'],
    ['そのレストランの人はみんな同じ制服を着ている。','制服',[['せいふく','제복 ✅'],['せいふう','★오독'],['ようふく','양복, 옷'],['ようふう','★오독']],0,false,'그 레스토랑 사람들은 모두 같은 제복을 입고 있다.'],
    ['改札の前で待ってるよ。','改札',[['かいさつ','개찰구 ✅'],['かいせつ','해설'],['けいさつ','경찰'],['けいせつ','★오독']],0,false,'개찰구 앞에서 기다릴게.'],
    ['社長に直接お目にかかりたいのですが。','直接',[['ちょくせつ','직접 ✅'],['ちょくぜつ','★오독'],['ちょうせつ','조절'],['ちょうぜつ','초절, 탁월']],0,false,'사장님을 직접 뵙고 싶습니다만.'],
    ['体調が悪いので早退します。','早退',[['そうてい','★오독'],['そうたい','조퇴 ✅'],['ぞうたい','★오독'],['とうだい','등대']],1,false,'몸이 안 좋아서 조퇴하겠습니다.'],
    ['列車は8時に東京駅に到着した。','到着',[['とつく','★오독'],['とうちゃく','도착 ✅'],['とうたい','★오독'],['とうじゃく','★오독']],1,false,'열차는 8시에 도쿄역에 도착했다.'],
    ['昨日体重を測った。','測った',[['まもった','지켰다'],['したがった','따랐다'],['しまった','(아차!)'],['はかった','측정했다 ✅']],3,false,'어제 체중을 쟀다.'],
  ]},
  { id:5, title:'확인문제 5', qs:[
    ['わたしは、普通朝食前に新聞を読みます。','普通',[['ふうつう','★오독'],['ふつう','보통 ✅'],['ふうだん','★오독'],['ふだん','평소']],1,false,'나는 보통 아침식사 전에 신문을 읽습니다.'],
    ['あまり遅くならないうちに帰ってきなさい。','遅く',[['おそく','늦게 ✅'],['はやく','빠르게'],['みじかく','짧게'],['とおく','멀게']],0,false,'너무 늦지 않게 돌아오너라.'],
    ['祖父は年のせいで少し腰が曲がっています。','腰',[['むね','가슴'],['かた','어깨'],['こし','허리 ✅'],['くび','목']],2,false,'할아버지는 나이 때문에 허리가 조금 굽어 있습니다.'],
    ['興味ある部分には下線を引いてください。','部分',[['ぶぶん','부분 ✅'],['ぶうぶん','★오독'],['ぶんこ','문고'],['ぶぶんこ','★오독']],0,false,'흥미 있는 부분에는 밑줄을 그어 주세요.'],
    ['トマトに塩をつけて食べた。','塩',[['まめ','콩'],['こめ','쌀'],['あぶら','기름'],['しお','소금 ✅']],3,false,'토마토에 소금을 찍어 먹었다.'],
    ['このテーブルの位置を変えたほうがいいよ。','位置',[['とち','토지'],['いち','위치 ✅'],['とじ','★오독'],['いじ','유지']],1,false,'이 테이블 위치를 바꾸는 게 좋겠어.'],
    ['その店はもうクリスマスの商品をならべている。','商品',[['せいひん','제품'],['しょうひん','상품 ✅'],['しょひん','★오독'],['しょうびん','★오독']],1,false,'그 가게는 벌써 크리스마스 상품을 진열하고 있다.'],
    ['その試合に約3万人の観客が集まった。','観客',[['けんきゃく','★오독'],['かんきゃく','관객 ✅'],['きゃくせき','객석'],['かんきょう','환경']],1,false,'그 시합에 약 3만 명의 관객이 모였다.'],
    ['司会者が説明を加えました。','加えました',[['くわえました','더했습니다 ✅'],['かぞえました','세었습니다'],['おえました','끝냈습니다'],['つたえました','전달했습니다']],0,false,'사회자가 설명을 덧붙였습니다.'],
    ['転んで前歯が2本折れた。','折れた',[['われた','깨졌다'],['おれた','부러졌다 ✅'],['ぬれた','젖었다'],['こわれた','고장났다']],1,false,'넘어져서 앞니가 2개 부러졌다.'],
  ]},
  { id:6, title:'확인문제 6', qs:[
    ['このえんぴつで線をかいてください。','線',[['ず','그림, 도표'],['せん','선 ✅'],['え','그림'],['もじ','문자']],1,false,'이 연필로 선을 그어 주세요.'],
    ['安全な場所へ逃げてください。','逃げて',[['にげて','도망쳐서 ✅'],['こげて','타서, 눌어서'],['なげて','던져서'],['あげて','들어올려서']],0,false,'안전한 곳으로 도망치세요.'],
    ['娘は来年卒業します。','卒業',[['さつきょう','★오독'],['さつぎょう','★오독'],['そうきょう','★오독'],['そつぎょう','졸업 ✅']],3,false,'딸은 내년에 졸업합니다.'],
    ['こたつが恋しい季節になった。','恋しい',[['やさしい','다정하다'],['こいしい','그립다 ✅'],['したしい','친하다'],['なつかしい','그립다, 정겹다']],1,false,'고타쓰가 그리운 계절이 되었다.'],
    ['彼が腕をぐるぐる回した。','回した',[['おした','눌렀다'],['まわした','돌렸다 ✅'],['のばした','뻗었다'],['おろした','내렸다']],1,false,'그가 팔을 빙글빙글 돌렸다.'],
    ['手術は成功した。','手術',[['しゅしゅつ','★오독'],['てじゅつ','★오독'],['てしゅつ','★오독'],['しゅじゅつ','수술 ✅']],3,false,'수술은 성공했다.'],
    ['階段で転んでしまった。','転んで',[['ころんで','넘어져서 ✅'],['はこんで','옮겨서'],['ふんで','밟아서'],['つんで','쌓아서, 실어서']],0,false,'계단에서 넘어져 버렸다.'],
    ['ゆでる前に豆を一晩水につけておいてください。','豆',[['いも','감자, 고구마'],['こな','가루'],['まめ','콩 ✅'],['かい','조개, 회']],2,false,'삶기 전에 콩을 하룻밤 물에 담가 두세요.'],
    ['彼の長年の努力が実った。','努力',[['ぎょうりょく','★오독'],['きょうりょく','협력'],['とりょく','★오독'],['どりょく','노력 ✅']],3,false,'그의 오랜 노력이 결실을 맺었다.'],
    ['病院で血圧を測ってもらった。','血圧',[['けつえき','혈액'],['けつあつ','혈압 ✅'],['ちいき','지역'],['ちあつ','★오독']],1,false,'병원에서 혈압을 측정받았다.'],
  ]},
  { id:7, title:'확인문제 7', qs:[
    ['彼は動作がにぶい。','動作',[['とうさ','★오독'],['どうさ','동작 ✅'],['とうさく','★오독'],['どうさく','★오독']],1,false,'그는 동작이 굼뜨다.'],
    ['そのプレゼントはきれいな紙で包んでありました。','包んで',[['むすんで','묶어서'],['あんで','★오독'],['つつんで','포장해서 ✅'],['はこんで','옮겨서']],2,false,'그 선물은 예쁜 종이로 포장되어 있었습니다.'],
    ['手紙はきのう確かに受け取りました。','確かに',[['たしかに','확실히 ✅'],['しずかに','조용히'],['たじかに','★오독'],['しすかに','★오독']],0,false,'편지는 어제 확실히 받았습니다.'],
    ['池田さんは機械に弱いらしい。','機械',[['きかい','기계 ✅'],['きけい','★오독'],['ぎかい','의회'],['ぎけい','★오독']],0,false,'이케다 씨는 기계에 약한 것 같다.'],
    ['あすから禁煙するつもりです。','禁煙',[['きねん','★오독'],['きんえん','금연 ✅'],['きんねん','★오독'],['きえん','★오독']],1,false,'내일부터 금연할 생각입니다.'],
    ['わたしは山本先生の講義の主要な点をメモした。','主要',[['しゅよ','★오독'],['じゅよ','수여'],['じゅよう','수요'],['しゅよう','주요 ✅']],3,false,'나는 야마모토 선생님 강의의 주요한 점을 메모했다.'],
    ['過去から学ぶことは多い。','過去',[['かこ','과거 ✅'],['かきょ','★오독'],['かきょう','★오독'],['こきょう','고향']],0,false,'과거로부터 배울 것은 많다.'],
    ['音楽は人類に共通のことばだ。','共通',[['きょうつ','★오독'],['こうつ','★오독'],['きょうつう','공통 ✅'],['こうつう','교통']],2,false,'음악은 인류에게 공통되는 언어다.'],
    ['丸い皿を買った。','丸い',[['ひくい','낮다'],['まるい','둥글다 ✅'],['かるい','가볍다'],['ほそい','가늘다']],1,false,'둥근 접시를 샀다.'],
    ['駅はどちらの方向ですか。','方向',[['ほうほう','방법'],['ほうこう','방향 ✅'],['ほうごう','★오독'],['ぼうこう','방광']],1,false,'역은 어느 방향입니까?'],
  ]},
];

/* ─── 과(課) 목록: 2과 이상 추가 시 V2/P2 만들고 아래 배열에 한 줄만 추가하면 됨 ── */
const LESSONS = [
  { n: 1, title: '1과', sub: '기출어휘 2016~2024', badge: 'l1', vocab: V1, probs: P1 },
  // { n: 2, title: '2과', sub: '...', badge: 'l2', vocab: V2, probs: P2 },
];
function getLesson(n) {
  return LESSONS.find(l => l.n === n) || LESSONS[0];
}

/* ─── 오답노트 저장 (localStorage) ───────────────────────────────── */
const STORAGE_KEY_V = 'jlpt_n3_wrongV';
const STORAGE_KEY_P = 'jlpt_n3_wrongP';

function emptyWrongMap() {
  const o = {};
  for (const l of LESSONS) o[l.n] = new Set();
  return o;
}
function loadWrongV() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_V);
    if (!raw) return emptyWrongMap();
    const obj = JSON.parse(raw);
    const result = {};
    for (const l of LESSONS) result[l.n] = new Set(obj[l.n] || []);
    return result;
  } catch (e) { return emptyWrongMap(); }
}
function loadWrongP() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_P);
    if (!raw) return emptyWrongMap();
    const obj = JSON.parse(raw);
    const result = {};
    for (const l of LESSONS) result[l.n] = new Set(obj[l.n] || []);
    return result;
  } catch (e) { return emptyWrongMap(); }
}
function saveWrongV(wrongV) {
  try {
    const obj = {};
    for (const l of LESSONS) obj[l.n] = [...wrongV[l.n]];
    localStorage.setItem(STORAGE_KEY_V, JSON.stringify(obj));
  } catch (e) {}
}
function saveWrongP(wrongP) {
  try {
    const obj = {};
    for (const l of LESSONS) obj[l.n] = [...wrongP[l.n]];
    localStorage.setItem(STORAGE_KEY_P, JSON.stringify(obj));
  } catch (e) {}
}

/* ─── 유틸 ───────────────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── 스마트 오답 생성기 ─────────────────────────────────────────
   type1 (히라가나→한글): 한국어 의미 유사도
   type2 (한자→한글):     한자 표기 유사도
   type3 (한자→히라가나): 히라가나 읽기 유사도
─────────────────────────────────────────────────────────────────── */
function scoreSimilarity(a, b, type) {
  if (!a || !b) return 0;
  let score = 0;
  if (type === 1) {
    if (a[0] === b[0]) score += 3;
    if (a.length === b.length) score += 2;
    for (const ch of a) { if (b.includes(ch)) score += 1; }
  } else {
    // type2(한자 유사), type3(히라가나 유사) 모두 같은 방식으로 처리
    if (a[0] === b[0]) score += 5;
    if (a.slice(-1) === b.slice(-1)) score += 2;
    if (a.length === b.length) score += 2;
    for (const ch of a) { if (b.includes(ch)) score += 1; }
  }
  return score;
}

function makeQuizOpts(vocab, idx, type) {
  const correct = vocab[idx];
  // type1,2: 정답은 한국어(field=2), type3: 정답은 히라가나(field=1)
  const ansField = type <= 2 ? 2 : 1;
  const compareField = ansField;
  const correctVal = correct[ansField];

  let pool = vocab.filter((_, i) => i !== idx);
  // type3(한자→히라가나): 한자 표기가 있는 어휘만 오답 후보로 사용
  if (type === 3) pool = pool.filter(w => w[0] !== w[1]);

  const scored = pool
    .map(w => ({ w, score: scoreSimilarity(correctVal, w[compareField], type) }))
    .sort((a, b) => b.score - a.score);

  const topPool = scored.slice(0, Math.min(15, scored.length));
  const shuffledTop = shuffle([...topPool]);
  const seen = new Set([correctVal]);
  const wrongs = [];
  for (const { w } of shuffledTop) {
    const v = w[compareField];
    if (!seen.has(v) && v) { seen.add(v); wrongs.push(v); }
    if (wrongs.length === 3) break;
  }
  if (wrongs.length < 3) {
    const rest = shuffle(scored.slice(15));
    for (const { w } of rest) {
      const v = w[compareField];
      if (!seen.has(v) && v) { seen.add(v); wrongs.push(v); }
      if (wrongs.length === 3) break;
    }
  }
  const all = shuffle([correctVal, ...wrongs]);
  return { opts: all, correctIdx: all.indexOf(correctVal) };
}

/* ─── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState('home');
  const [lesson, setLesson] = useState(1);
  const [quizType, setQuizType] = useState(1);
  const [pracSetIdx, setPracSetIdx] = useState(0);
  const [vocabFilter, setVocabFilter] = useState('all');
  const [quizRandom, setQuizRandom] = useState(false);
  const [pracRandom, setPracRandom] = useState(false);
  const [wrongV, setWrongV] = useState(() => loadWrongV());
  const [wrongP, setWrongP] = useState(() => loadWrongP());

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { if (document.head.contains(el)) document.head.removeChild(el); };
  }, []);

  useEffect(() => { saveWrongV(wrongV); }, [wrongV]);
  useEffect(() => { saveWrongP(wrongP); }, [wrongP]);

  const curLesson = getLesson(lesson);
  const vocab = curLesson.vocab;
  const probs = curLesson.probs;
  const allVocab = useMemo(() => LESSONS.flatMap(l => l.vocab), []);
  const allProbs = useMemo(() => LESSONS.flatMap(l => l.probs), []);

  const goHome = () => setScreen('home');
  const goMenu = (l) => { setLesson(l); setScreen('menu'); };
  const addWrongV = (i) => setWrongV(p => ({ ...p, [lesson]: new Set([...p[lesson], i]) }));
  const removeWrongV = (i) => setWrongV(p => { const s = new Set(p[lesson]); s.delete(i); return { ...p, [lesson]: s }; });
  const addWrongP = (key) => setWrongP(p => ({ ...p, [lesson]: new Set([...p[lesson], key]) }));
  const removeWrongP = (key) => setWrongP(p => { const s = new Set(p[lesson]); s.delete(key); return { ...p, [lesson]: s }; });
  const wrongVCount = wrongV[lesson].size;
  const wrongPCount = wrongP[lesson].size;
  const wrongCounts = useMemo(() => {
    const o = {};
    for (const l of LESSONS) o[l.n] = wrongV[l.n] ? wrongV[l.n].size : 0;
    return o;
  }, [wrongV]);

  return (
    <div className="app">
      {screen === 'home' && <HomeScreen onSelect={goMenu} wrongCounts={wrongCounts} />}
      {screen === 'menu' && <MenuScreen lesson={curLesson} probs={probs} vocab={vocab} wrongVCount={wrongVCount} wrongPCount={wrongPCount} onBack={goHome} onVocab={() => setScreen('vocab')} onQuiz={(t) => { setQuizType(t); setScreen('quiz'); }} onPractice={() => setScreen('practice')} onWrong={() => setScreen('wrong')} quizRandom={quizRandom} setQuizRandom={setQuizRandom} pracRandom={pracRandom} setPracRandom={setPracRandom} />}
      {screen === 'vocab' && <VocabScreen vocab={vocab} lesson={lesson} wrongSet={wrongV[lesson]} filter={vocabFilter} setFilter={setVocabFilter} onAddWrong={addWrongV} onRemoveWrong={removeWrongV} onBack={() => setScreen('menu')} />}
      {screen === 'quiz' && <QuizScreen vocab={quizRandom ? allVocab : vocab} lesson={lesson} quizType={quizType} isRandom={quizRandom} onAddWrong={addWrongV} onBack={() => setScreen('menu')} />}
      {screen === 'practice' && <PracticeSetScreen probs={probs} allProbs={allProbs} lesson={lesson} wrongSet={wrongP[lesson]} isRandom={pracRandom} setIsRandom={setPracRandom} onBack={() => setScreen('menu')} onSelect={(i) => { setPracSetIdx(i); setScreen('pracSolve'); }} />}
      {screen === 'pracSolve' && <PracticeSolveScreen probSet={(pracRandom ? allProbs : probs)[pracSetIdx]} lesson={lesson} wrongSet={wrongP[lesson]} onAddWrong={addWrongP} onRemoveWrong={removeWrongP} onBack={() => setScreen('practice')} />}
      {screen === 'wrong' && <WrongScreen vocab={vocab} wrongVIdx={wrongV[lesson]} wrongPKeys={wrongP[lesson]} probs={probs} onBack={() => setScreen('menu')} onClearVocab={removeWrongV} />}
    </div>
  );
}

/* ─── HOME ─────────────────────────────────────────────────────────── */
function HomeScreen({ onSelect, wrongCounts }) {
  return (
    <div>
      <div className="home-hdr">
        <div className="home-logo">🇯🇵</div>
        <div className="home-title">JLPT N3 학습앱</div>
        <div className="home-sub">한자읽기 기출어휘 · 확인문제<br/>다락원 한권으로 끝내기 스타일</div>
      </div>
      {LESSONS.map(l => (
        <div key={l.n} className="lesson-card" onClick={() => onSelect(l.n)}>
          <div className={`lesson-badge ${l.badge}`}>{l.n}</div>
          <div className="lesson-info">
            <div className="lesson-name" style={{display:'flex',alignItems:'center',gap:'6px'}}>
              {l.title}
              <span style={{fontSize:'10px',fontWeight:'700',padding:'1px 7px',borderRadius:'10px',background:'var(--or)',color:'#fff'}}>한자읽기</span>
            </div>
            <div className="lesson-year">{l.sub}</div>
            <div className="lesson-wc">📝 어휘 {l.vocab.length}개 · 확인문제 {l.probs.length}세트
              {wrongCounts[l.n] > 0 && <span style={{color:'var(--rd)',marginLeft:8}}>⚠ 오답 {wrongCounts[l.n]}</span>}
            </div>
          </div>
          <div style={{color:'var(--tx3)',fontSize:'20px'}}>›</div>
        </div>
      ))}
      <div style={{margin:'16px 16px 0',padding:'14px 16px',background:'var(--bg2)',borderRadius:'12px',border:'1px solid var(--bg3)'}}>
        <div style={{fontSize:'11px',color:'var(--or)',fontWeight:'700',marginBottom:'10px'}}>📋 문제 유형 안내</div>
        <div style={{fontSize:'12px',color:'var(--tx2)',lineHeight:'1.6'}}>
          밑줄 친 한자·단어의 히라가나 읽기를 4개 보기에서 고르는 문제입니다 (기출어휘 연도순 정리 + 확인문제 7세트).
        </div>
      </div>
      <div style={{margin:'10px 16px 0',padding:'12px 16px',background:'var(--bg2)',borderRadius:'12px',border:'1px solid var(--bg3)'}}>
        <div style={{fontSize:'11px',color:'var(--or)',fontWeight:'700',marginBottom:'8px'}}>📖 학습 가이드</div>
        <div style={{fontSize:'12px',color:'var(--tx2)',lineHeight:'1.9'}}>
          1. <b style={{color:'var(--tx)'}}>어휘 학습</b> — 플래시카드 + 암기 힌트<br/>
          2. <b style={{color:'var(--tx)'}}>퀴즈 3종</b> — 히라가나→한글 / 한자→한글 / 한자→히라가나<br/>
          3. <b style={{color:'var(--tx)'}}>확인문제 풀이</b> — 기출 확인문제 7세트 + 해석<br/>
          4. <b style={{color:'var(--tx)'}}>오답노트</b> — 틀린 어휘·문제만 모아서 복습<br/>
          ※ 앞으로 2과 이상이 추가될 예정입니다.
        </div>
      </div>
    </div>
  );
}

/* ─── MENU ─────────────────────────────────────────────────────────── */
function MenuScreen({ lesson, probs, vocab, wrongVCount, wrongPCount, onBack, onVocab, onQuiz, onPractice, onWrong, quizRandom, setQuizRandom, pracRandom, setPracRandom }) {
  const totalWrong = wrongVCount + wrongPCount;
  return (
    <div>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← 홈</button>
        <span className="nav-title" style={{display:'flex',alignItems:'center',gap:'6px'}}>
          {lesson.title} 학습
          <span style={{fontSize:'10px',fontWeight:'700',padding:'1px 7px',borderRadius:'10px',background:'var(--or)',color:'#fff'}}>한자읽기</span>
        </span>
        <span className="nav-sub">{vocab.length}어휘</span>
      </div>
      <div className="menu-grid">
        <div className="menu-cell full" onClick={onVocab}><div className="menu-icon">📚</div><div className="menu-label">어휘 학습</div><div className="menu-hint">플래시카드 + 암기 힌트</div></div>
        <div className="menu-cell" onClick={() => onQuiz(1)}><div className="menu-icon">🔤</div><div className="menu-label">퀴즈 ①</div><div className="menu-hint">히라가나 → 한글</div></div>
        <div className="menu-cell" onClick={() => onQuiz(2)}><div className="menu-icon">漢</div><div className="menu-label">퀴즈 ②</div><div className="menu-hint">한자 → 한글</div></div>
        <div className="menu-cell full" onClick={() => onQuiz(3)}><div className="menu-icon">✍️</div><div className="menu-label">퀴즈 ③</div><div className="menu-hint">한자 → 히라가나</div></div>
        <div className="menu-cell full" style={{padding:'12px 16px'}}>
          <div style={{fontSize:'12px',color:'var(--tx2)',fontWeight:'600',marginBottom:'8px'}}>🎲 퀴즈 범위 선택</div>
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={() => setQuizRandom(false)} style={{flex:1,padding:'8px',borderRadius:'8px',fontSize:'12px',fontWeight:'700',cursor:'pointer',border:'2px solid',borderColor:!quizRandom?'var(--or)':'var(--bg3)',background:!quizRandom?'var(--or)':'var(--bg3)',color:!quizRandom?'#fff':'var(--tx2)'}}>이 과만</button>
            <button onClick={() => setQuizRandom(true)} style={{flex:1,padding:'8px',borderRadius:'8px',fontSize:'12px',fontWeight:'700',cursor:'pointer',border:'2px solid',borderColor:quizRandom?'#a855f7':'var(--bg3)',background:quizRandom?'#a855f7':'var(--bg3)',color:quizRandom?'#fff':'var(--tx2)'}}>🎲 전 과목 랜덤</button>
          </div>
        </div>
        <div className="menu-cell full" onClick={onPractice}><div className="menu-icon">📝</div><div className="menu-label">확인문제 풀이</div><div className="menu-hint">{probs.length}세트 · {probs.length * 10}문항 · 해석 제공</div></div>
        <div className="menu-cell full danger" onClick={onWrong}><div className="menu-icon">⚠️</div><div className="menu-label">오답 복습{totalWrong > 0 && <span className="menu-badge">{totalWrong}</span>}</div><div className="menu-hint">어휘 {wrongVCount}개 · 문제 {wrongPCount}개</div></div>
      </div>
    </div>
  );
}

/* ─── VOCAB (플래시카드) ─────────────────────────────────────────── */
function VocabScreen({ vocab, lesson, wrongSet, filter, setFilter, onAddWrong, onRemoveWrong, onBack }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'imp') return shuffle(vocab.map((v, i) => ({ v, i })).filter(x => x.v[4]));
    if (filter === 'wrong') return shuffle(vocab.map((v, i) => ({ v, i })).filter(x => wrongSet.has(x.i)));
    return shuffle(vocab.map((v, i) => ({ v, i })));
  }, [vocab, filter, wrongSet]);

  useEffect(() => { setIdx(0); setFlipped(false); setShowHint(false); }, []);

  if (!filtered.length) {
    return (
      <div>
        <div className="nav"><button className="nav-back" onClick={onBack}>← 메뉴</button><span className="nav-title">어휘 학습</span></div>
        <div className="empty"><div className="empty-icon">📭</div><div className="empty-text">해당 항목이 없습니다</div></div>
      </div>
    );
  }

  const safeIdx = Math.min(idx, filtered.length - 1);
  const { v: word, i: realIdx } = filtered[safeIdx];
  const isWrong = wrongSet.has(realIdx);

  const next = () => { setFlipped(false); setShowHint(false); setIdx(i => (i + 1) % filtered.length); };
  const prev = () => { setFlipped(false); setShowHint(false); setIdx(i => (i - 1 + filtered.length) % filtered.length); };
  const handleMiss = () => { onAddWrong(realIdx); next(); };
  const handleHit = () => { if (isWrong) onRemoveWrong(realIdx); next(); };

  return (
    <div>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← 메뉴</button>
        <span className="nav-title">어휘 학습</span>
        <span className="nav-sub">{safeIdx + 1}/{filtered.length}</span>
      </div>
      <div className="fc-wrap">
        <div className="fc-header">
          <span className="fc-counter">{isWrong ? '⚠️ 오답' : ''}</span>
          <div className="fc-filter">
            {['all','imp','wrong'].map(f => (
              <button key={f} className={`fc-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? '전체' : f === 'imp' ? '⭐중요' : `⚠오답(${wrongSet.size})`}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
          <div style={{flex:1,height:'6px',background:'var(--bg3)',borderRadius:'3px',overflow:'hidden',position:'relative'}}>
            <div style={{
              position:'absolute',left:0,top:0,height:'100%',borderRadius:'3px',
              background:'linear-gradient(90deg,var(--or),#f59e0b)',
              width:`${Math.round(((safeIdx+1)/filtered.length)*100)}%`,
              transition:'width .4s cubic-bezier(.34,1.56,.64,1)'
            }}/>
          </div>
          <span style={{fontSize:'12px',color:'var(--or)',fontWeight:'700',whiteSpace:'nowrap'}}>
            {safeIdx+1}/{filtered.length} ({Math.round(((safeIdx+1)/filtered.length)*100)}%)
          </span>
        </div>
        <div className={`fc-card ${flipped ? 'flipped' : ''}`} onClick={() => { setFlipped(f => !f); setShowHint(false); }}>
          {word[4] && <div className="fc-imp">⭐ 중요</div>}
          {!flipped ? (
            <>
              <div className="fc-kanji">{word[0]}</div>
              {word[3] && !showHint && (
                <button className="fc-hint-btn" onClick={e => { e.stopPropagation(); setShowHint(true); }}>
                  💡 암기 힌트
                </button>
              )}
              {showHint && <div className="fc-hint" onClick={e => e.stopPropagation()}>{word[3]}</div>}
              <div className="fc-tap">탭하여 뒤집기 👆</div>
            </>
          ) : (
            <>
              <div className="fc-kanji fc-small">{word[0]}</div>
              <div className="fc-hira">{word[1]}</div>
              <div className="fc-korean">{word[2]}</div>
              {word[3] && !showHint && <button className="fc-hint-btn" onClick={e => { e.stopPropagation(); setShowHint(true); }}>💡 암기 힌트</button>}
              {showHint && <div className="fc-hint">{word[3]}</div>}
            </>
          )}
        </div>
        {flipped && (
          <div className="fc-actions">
            <button className="fc-action miss" onClick={handleMiss}>😰 몰랐어요</button>
            <button className="fc-action hit" onClick={handleHit}>✅ 알았어요</button>
          </div>
        )}
        <div style={{display:'flex',gap:'8px',marginTop:'12px'}}>
          <button className="btn btn-ghost" style={{flex:1}} onClick={prev}>◀ 이전</button>
          <button className="btn btn-ghost" style={{flex:1}} onClick={next}>다음 ▶</button>
        </div>
      </div>
    </div>
  );
}

/* ─── QUIZ ─────────────────────────────────────────────────────────── */
function QuizScreen({ vocab, lesson, quizType, isRandom, onAddWrong, onBack }) {
  const typeLabels = ['', '히라가나 → 한글', '한자 → 한글', '한자 → 히라가나'];
  // type3(한자→히라가나)는 한자 표기가 없는(표기=히라가나) 어휘는 제외
  const order = useMemo(() => {
    let idxs = vocab.map((_, i) => i);
    if (quizType === 3) idxs = idxs.filter(i => vocab[i][0] !== vocab[i][1]);
    return shuffle(idxs);
  }, [vocab, quizType]);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(10);
  const timerRef = React.useRef(null);

  const goNext = React.useCallback((isCorrect) => {
    setResults(r => [...r, isCorrect]);
  }, []);

  const advanceStep = React.useCallback(() => {
    setSelected(null);
    setTimer(10);
    if (step + 1 >= order.length) setDone(true);
    else setStep(s => s + 1);
  }, [step, order]);

  useEffect(() => {
    if (done || selected !== null) {
      clearInterval(timerRef.current);
      return;
    }
    setTimer(10);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setSelected(-1);
          onAddWrong(order[step]);
          goNext(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [step, done, selected]);

  const currentOpts = useMemo(() => {
    if (step >= order.length) return null;
    return makeQuizOpts(vocab, order[step], quizType);
  }, [step, order, vocab, quizType]);

  if (done || step >= order.length) {
    const correct = results.filter(r => r).length;
    const pct = Math.round((correct / results.length) * 100);
    return (
      <div>
        <div className="nav"><button className="nav-back" onClick={onBack}>← 메뉴</button><span className="nav-title">퀴즈 결과</span></div>
        <div className="qz-score">
          <div className="score-emoji">{pct >= 80 ? '🎉' : pct >= 60 ? '😊' : '💪'}</div>
          <div className="score-big">{pct}%</div>
          <div className="score-pct">{correct}/{results.length} 정답</div>
          <div className="score-row">
            <div className="score-item"><div className="num g">{correct}</div><div className="lbl">정답</div></div>
            <div className="score-item"><div className="num r">{results.length - correct}</div><div className="lbl">오답</div></div>
          </div>
          <button className="btn btn-or mt16" onClick={() => { setStep(0); setSelected(null); setResults([]); setDone(false); }}>🔄 다시 풀기</button>
          <button className="btn btn-ghost mt8" onClick={onBack}>메뉴로</button>
        </div>
      </div>
    );
  }

  const word = vocab[order[step]];
  const { opts, correctIdx } = currentOpts;
  // 문제 표시: type1=히라가나(field1), type2/3=한자(field0)
  const displayVal = quizType === 1 ? word[1] : word[0];

  const handleSelect = (oi) => {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setSelected(oi);
    if (oi !== correctIdx) onAddWrong(order[step]);
    goNext(oi === correctIdx);
  };

  return (
    <div>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← 메뉴</button>
        <span className="nav-title">퀴즈 {quizType}{isRandom && <span className="random-badge">🎲 전체</span>}</span>
        <span className="nav-sub">{step + 1}/{order.length}</span>
      </div>
      <div className="qz-wrap">
        <div className="qz-info-bar">
          <span>🟢 {results.filter(r=>r).length}</span>
          <div className="qz-timer">
            <div className="qz-timer-bar">
              <div className="qz-timer-fill" style={{
                width: `${(timer/10)*100}%`,
                background: timer > 5 ? 'var(--gn)' : timer > 2 ? 'var(--gd)' : 'var(--rd)'
              }} />
            </div>
            <span className="qz-timer-num" style={{
              color: timer > 5 ? 'var(--gn)' : timer > 2 ? 'var(--gd)' : 'var(--rd)'
            }}>{selected === null ? timer : ''}</span>
          </div>
          <span>🔴 {results.filter(r=>!r).length}</span>
        </div>
        <div className="qz-prog">
          {order.map((_, i) => (
            <div key={i} className={`qz-prog-seg ${i < results.length ? (results[i] ? 'correct' : 'wrong') : ''}`} />
          ))}
        </div>
        <div className="qz-card">
          <div className="qz-type">{typeLabels[quizType]}</div>
          <div className={`qz-word ${quizType === 1 ? 'hira' : ''}`}>{displayVal}</div>
          {word[4] && <div style={{fontSize:'11px',color:'var(--gd)',marginTop:'8px'}}>⭐ 중요 어휘</div>}
        </div>
        <div className="qz-opts">
          {opts.map((opt, oi) => {
            let cls = 'qz-opt';
            if (selected !== null) {
              if (oi === correctIdx) cls += ' correct';
              else if (oi === selected) cls += ' wrong';
            }
            return (
              <div key={oi} className={cls} data-disabled={selected !== null ? 'true' : undefined} onClick={() => handleSelect(oi)}>
                {opt}
              </div>
            );
          })}
        </div>
        {selected !== null && (
          <div>
            <div className="qz-feedback" style={{marginBottom:'10px'}}>
              {selected === -1
                ? `⏰ 시간 초과! 정답: ${opts[correctIdx]} — ${word[0]} = ${word[1]} (${word[2]})`
                : selected === correctIdx
                  ? `✅ 정답! ${word[0]} = ${word[1]} (${word[2]})`
                  : `❌ 오답. 정답: ${opts[correctIdx]} — ${word[0]} = ${word[1]} (${word[2]})`}
            </div>
            <button
              onClick={advanceStep}
              style={{width:'100%',padding:'13px',borderRadius:'12px',background:'var(--or)',
                color:'#fff',fontWeight:'700',fontSize:'15px',cursor:'pointer',border:'none',
                letterSpacing:'0.5px'}}>
              {step + 1 >= order.length ? '🏁 결과 보기' : '다음 문제 →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PRACTICE SET SELECT ───────────────────────────────────────────── */
function PracticeSetScreen({ probs, allProbs, lesson, wrongSet, isRandom, setIsRandom, onBack, onSelect }) {
  const displayProbs = isRandom ? allProbs : probs;
  return (
    <div>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← 메뉴</button>
        <span className="nav-title">확인문제 풀이{isRandom && <span className="random-badge">🎲</span>}</span>
        <span className="nav-sub">{displayProbs.length}세트</span>
      </div>
      <div style={{padding:'10px 16px 0'}}>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={() => setIsRandom(false)} style={{flex:1,padding:'9px',borderRadius:'10px',fontSize:'12px',fontWeight:'700',cursor:'pointer',border:'2px solid',borderColor:!isRandom?'var(--or)':'var(--bg3)',background:!isRandom?'var(--or)':'var(--bg2)',color:!isRandom?'#fff':'var(--tx2)'}}>이 과만 ({probs.length}세트)</button>
          <button onClick={() => setIsRandom(true)} style={{flex:1,padding:'9px',borderRadius:'10px',fontSize:'12px',fontWeight:'700',cursor:'pointer',border:'2px solid',borderColor:isRandom?'#a855f7':'var(--bg3)',background:isRandom?'#a855f7':'var(--bg2)',color:isRandom?'#fff':'var(--tx2)'}}>🎲 전 과목 ({allProbs.length}세트)</button>
        </div>
      </div>
      <div className="prac-sets" style={{paddingTop:'10px'}}>
        {displayProbs.map((ps, i) => {
          const wrongInSet = ps.qs.filter((_, qi) => wrongSet.has(`${ps.id}-${qi}`)).length;
          return (
            <div key={ps.id} className="prac-set-card" onClick={() => onSelect(i)}>
              <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                <div className="prac-num-badge">{ps.id}</div>
                <div>
                  <div className="prac-set-title">{ps.title}</div>
                  <div className="prac-set-score">10문항{wrongInSet > 0 && <span style={{color:'var(--rd)',marginLeft:8}}>⚠ 오답 {wrongInSet}</span>}</div>
                </div>
              </div>
              <div style={{color:'var(--tx3)',fontSize:'18px'}}>›</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── PRACTICE SOLVE ────────────────────────────────────────────────── */
function PracticeSolveScreen({ probSet, lesson, wrongSet, onAddWrong, onRemoveWrong, onBack }) {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (qi, oi) => {
    if (answers[qi] !== undefined) return;
    setAnswers(a => ({ ...a, [qi]: oi }));
    const q = probSet.qs[qi];
    const key = `${probSet.id}-${qi}`;
    if (oi !== q[3]) onAddWrong(key);
    else onRemoveWrong(key);
  };

  const answered = Object.keys(answers).length;
  const total = probSet.qs.length;
  const correct = Object.entries(answers).filter(([qi, oi]) => oi === probSet.qs[+qi][3]).length;

  return (
    <div>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← 목록</button>
        <span className="nav-title">{probSet.title}</span>
        <span className="nav-sub">{answered}/{total} · 정답 {correct}</span>
      </div>
      <div className="prac-q-wrap">
        {probSet.qs.map((q, qi) => {
          const [sent, ul, opts, ans, imp, meaning] = q;
          const userAns = answers[qi];
          const isAnswered = userAns !== undefined;
          return (
            <div key={qi} className="prac-q">
              <div className="prac-q-num">
                <div className="prac-q-n">{qi + 1}</div>
                {imp && <div className="prac-imp">⭐ 중요</div>}
                {isAnswered && (
                  <div style={{fontSize:'14px',marginLeft:'auto',fontWeight:'700',color:userAns===ans?'var(--gn)':'var(--rd)'}}>
                    {userAns === ans ? '✅' : '❌'}
                  </div>
                )}
              </div>
              <div className="prac-sent">{renderSentence(sent, ul)}</div>
              <div className="prac-opts">
                {opts.map((opt, oi) => {
                  const isPair = Array.isArray(opt);
                  const optJP = isPair ? opt[0] : opt;
                  const optKO = isPair ? opt[1] : null;
                  let cls = 'prac-opt';
                  if (isAnswered) {
                    if (oi === ans) cls += ' correct';
                    else if (oi === userAns) cls += ' wrong';
                  }
                  return (
                    <div key={oi} className={cls} data-disabled={isAnswered ? 'true' : undefined} onClick={() => handleAnswer(qi, oi)}>
                      <span style={{fontSize:'13px',fontWeight:'700',minWidth:'18px',opacity:0.6}}>{oi + 1}</span>
                      <div style={{flex:1}}>
                        <div style={{lineHeight:'1.7'}}>{optJP}</div>
                        {isAnswered && optKO && (
                          <div style={{fontSize:'11px',
                            color: oi===ans ? '#22c55e' : oi===userAns ? 'var(--rd)' : 'var(--tx3)',
                            marginTop:'2px',lineHeight:'1.5'}}>
                            🇰🇷 {optKO}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {isAnswered && (
                <>
                  {userAns !== ans && (
                    <div className="prac-result">
                      정답: {Array.isArray(opts[ans]) ? opts[ans][0] : opts[ans]} ({ans + 1}번)
                    </div>
                  )}
                  {meaning && <div className="prac-meaning">📖 {meaning}</div>}
                </>
              )}
            </div>
          );
        })}
        {answered === total && (
          <div style={{background:'var(--bg2)',borderRadius:'14px',padding:'24px',textAlign:'center',marginBottom:'16px'}}>
            <div style={{fontSize:'32px'}}>{correct>=8?'🎉':correct>=6?'😊':'💪'}</div>
            <div style={{fontSize:'28px',fontWeight:'900',color:'var(--or)',margin:'8px 0'}}>{correct}/{total}</div>
            <div style={{fontSize:'14px',color:'var(--tx2)'}}>{correct>=8?'훌륭합니다!':correct>=6?'잘 하셨어요!':'오답 복습을 확인하세요!'}</div>
          </div>
        )}
        <button className="btn btn-ghost" onClick={onBack} style={{marginTop:'8px',marginBottom:'24px'}}>← 목록으로</button>
      </div>
    </div>
  );
}

/* ─── WRONG NOTE ─────────────────────────────────────────────────────── */
function WrongScreen({ vocab, wrongVIdx, wrongPKeys, probs, onBack, onClearVocab }) {
  const wrongVocab = [...wrongVIdx].map(i => ({ i, v: vocab[i] })).filter(x => x.v);
  const wrongProbs = [...wrongPKeys].map(key => {
    const [sid, qi] = key.split('-').map(Number);
    const ps = probs.find(p => p.id === sid);
    if (!ps) return null;
    return { key, ps, qi, q: ps.qs[qi] };
  }).filter(Boolean);
  const total = wrongVocab.length + wrongProbs.length;

  if (total === 0) {
    return (
      <div>
        <div className="nav"><button className="nav-back" onClick={onBack}>← 메뉴</button><span className="nav-title">오답 복습</span></div>
        <div className="empty"><div className="empty-icon">🎉</div><div className="empty-text">오답이 없습니다! 완벽해요!</div></div>
      </div>
    );
  }

  return (
    <div>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← 메뉴</button>
        <span className="nav-title">오답 복습</span>
        <span className="nav-sub">{total}개</span>
      </div>
      <div className="wr-list">
        {wrongVocab.length > 0 && (
          <>
            <div style={{fontSize:'11px',color:'var(--tx3)',fontWeight:'600',letterSpacing:'1px',marginBottom:'10px'}}>── 어휘 오답 ({wrongVocab.length})</div>
            {wrongVocab.map(({ i, v }) => (
              <div key={i} className="wr-item">
                <div className="wr-kanji">{v[0]}</div>
                <div className="wr-info">
                  <div className="wr-hira">{v[1]}</div>
                  <div className="wr-kr">{v[2]}</div>
                  {v[3] && <div style={{fontSize:'11px',color:'var(--tx3)',marginTop:'3px'}}>{v[3]}</div>}
                </div>
                <button style={{background:'transparent',border:'1px solid var(--bg4)',color:'var(--tx3)',padding:'6px 10px',borderRadius:'8px',cursor:'pointer',fontSize:'12px'}} onClick={() => onClearVocab(i)}>✓</button>
              </div>
            ))}
          </>
        )}
        {wrongProbs.length > 0 && (
          <>
            <div style={{fontSize:'11px',color:'var(--tx3)',fontWeight:'600',letterSpacing:'1px',marginBottom:'10px',marginTop:wrongVocab.length>0?'20px':'4px'}}>── 문제 오답 ({wrongProbs.length})</div>
            {wrongProbs.map(({ key, ps, qi, q }) => {
              const [sent, ul, opts, ans] = q;
              return (
                <div key={key} style={{background:'var(--bg2)',border:'1px solid var(--bg3)',borderRadius:'12px',padding:'14px',marginBottom:'10px'}}>
                  <div style={{fontSize:'11px',color:'var(--or)',marginBottom:'6px',fontWeight:'600'}}>{ps.title} Q{qi+1}</div>
                  <div style={{fontSize:'14px',lineHeight:'2.4',marginBottom:'8px',fontFamily:"'BIZ UDPMincho',serif"}}>
                    {renderSentence(sent, ul)}
                  </div>
                  <div style={{fontSize:'14px',color:'var(--gn)',fontWeight:'700'}}>정답: {Array.isArray(opts[ans]) ? opts[ans][0] : opts[ans]} ({ans+1}번)</div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
