import{M as l}from"./index-DEUAvz0Y.js";import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as t}from"./index-B7_Hqcjg.js";import"./iframe-DDkQTc1T.js";import"../sb-preview/runtime.js";import"./index-CTjT7uj6.js";import"./assertThisInitialized-BhlF73o5.js";import"./index-CpHeDkVl.js";import"./index-OArTgSY1.js";import"./index-DrFu-skq.js";function r(s){const e=Object.assign({h1:"h1",p:"p",hr:"hr",h2:"h2",ul:"ul",li:"li",strong:"strong",h3:"h3",br:"br",code:"code",em:"em"},t(),s.components);return n.jsxs(n.Fragment,{children:[n.jsx(l,{title:"Stories/PlayoutTrimmer/Description"}),`
`,n.jsx(e.h1,{id:"playouttrimmer",children:"PlayoutTrimmer"}),`
`,n.jsx(e.p,{children:"A triple-handle timeline component for range selection and precise progress control."}),`
`,n.jsx(e.p,{children:"Designed for media-oriented interfaces where users need to define a segment and navigate within it."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"overview",children:"Overview"}),`
`,n.jsx(e.p,{children:"The component exposes two coordinated controls:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Range"})," — defines an active segment"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Progress"})," — represents position within that segment"]}),`
`]}),`
`,n.jsx(e.p,{children:"Progress is automatically constrained to the active range, ensuring consistent behavior during interaction."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"key-concepts",children:"Key Concepts"}),`
`,n.jsx(e.h3,{id:"coordinated-state",children:"Coordinated State"}),`
`,n.jsxs(e.p,{children:["Range and progress are managed independently but remain logically synchronized.",n.jsx(e.br,{}),`
`,"Updates to the range will clamp the progress value when necessary."]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"unit-agnostic-scaling",children:"Unit-Agnostic Scaling"}),`
`,n.jsx(e.p,{children:"The component operates independently of any specific unit system:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Normalized"})," → ",n.jsx(e.code,{children:"0 → 1"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Absolute units"})," → arbitrary ranges (e.g. frames, time, ticks)"]}),`
`]}),`
`,n.jsx(e.p,{children:"This allows the same component to be reused across different domains without modifying internal logic."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"deterministic--controlled",children:"Deterministic & Controlled"}),`
`,n.jsx(e.p,{children:"The component is fully controlled and stateless:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"All state is managed externally"}),`
`,n.jsx(e.li,{children:"No implicit assumptions about time or units"}),`
`,n.jsx(e.li,{children:"Predictable updates through standard event handlers"}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"integration",children:"Integration"}),`
`,n.jsx(e.p,{children:"Designed to work with external state management:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Supports asynchronous and optimistic updates"}),`
`,n.jsx(e.li,{children:"Can be driven by multiple input sources (sliders, buttons, programmatic updates)"}),`
`,n.jsx(e.li,{children:"Maintains consistent behavior under rapid updates"}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"api-essential-props",children:"API (Essential Props)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"totalSeconds"})})," — total duration (used for ruler labeling)"]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"totalUnits"})})," ",n.jsx(e.em,{children:"(optional)"})," — enables unit-based scaling"]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:n.jsx(e.code,{children:"RangeSliderProps"})})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"value: [number, number]"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"onChange"})}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:n.jsx(e.code,{children:"ProgressSliderProps"})})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"value: number"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"onChange"})}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"disableProgressConstraint"})})," ",n.jsx(e.em,{children:"(optional)"})]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"disables automatic clamping when external control is required"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"notes",children:"Notes"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Built on top of MUI primitives with custom coordination logic"}),`
`,n.jsx(e.li,{children:"Designed for composability and reuse across different interaction models"}),`
`,n.jsx(e.li,{children:"Handles edge cases such as dynamic range updates and transient invalid values"}),`
`]})]})}function o(s={}){const{wrapper:e}=Object.assign({},t(),s.components);return e?n.jsx(e,{...s,children:n.jsx(r,{...s})}):r(s)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const i={title:"Stories/PlayoutTrimmer/Description",tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:o};const b=["__page"];export{b as __namedExportsOrder,d as __page,i as default};
