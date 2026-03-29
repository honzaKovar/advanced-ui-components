import"./chunk-HLWAVYOI-Cy6vzTZy.js";import{M as t}from"./index-BBo-cczk.js";import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as o}from"./index-B7_Hqcjg.js";import"./iframe-BbZfjQMy.js";import"../sb-preview/runtime.js";import"./index-CTjT7uj6.js";import"./react-18-DMU7YjPt.js";import"./index-CpHeDkVl.js";import"./assertThisInitialized-BhlF73o5.js";import"./index-OArTgSY1.js";import"./index-DrFu-skq.js";function i(s){const n=Object.assign({h1:"h1",p:"p",code:"code",strong:"strong",ul:"ul",li:"li",hr:"hr",h2:"h2",h3:"h3"},o(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Stories/RichTree/Description"}),`
`,e.jsx(n.h1,{id:"richtree",children:"RichTree"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"RichTree"})," is an advanced, highly extensible tree view component built on ",e.jsx(n.strong,{children:"MUI X RichTreeViewPro"}),"."]}),`
`,e.jsxs(n.p,{children:["It is designed for ",e.jsx(n.strong,{children:"large interactive hierarchies"})," with features like:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Drag-and-drop aware UI layer (implementation-agnostic)"}),`
`,e.jsx(n.li,{children:"Node customization with icons, buttons, and styles"}),`
`,e.jsx(n.li,{children:"Separation of domain data from presentation logic"}),`
`,e.jsx(n.li,{children:"Scalable performance for deeply nested trees"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"core-architecture",children:"Core Architecture"}),`
`,e.jsx(n.h3,{id:"resolver-based-design",children:"Resolver-Based Design"}),`
`,e.jsxs(n.p,{children:["At its core, ",e.jsx(n.code,{children:"RichTree"})," uses a ",e.jsx(n.strong,{children:"Prop Resolver system"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["UI properties are computed ",e.jsx(n.strong,{children:"at render time"})," instead of being stored on data nodes"]}),`
`,e.jsxs(n.li,{children:["Domain data (",e.jsx(n.code,{children:"items"}),") remain ",e.jsx(n.strong,{children:"UI-agnostic"})]}),`
`,e.jsxs(n.li,{children:["Resolvers are ",e.jsx(n.strong,{children:"stable and memoized"}),", ensuring minimal re-renders"]}),`
`,e.jsx(n.li,{children:"Each node can be customized independently (icons, buttons, styles, dropzones)"}),`
`]}),`
`,e.jsxs(n.p,{children:["This pattern ensures ",e.jsx(n.strong,{children:"referential stability"}),", centralized UI logic, and ",e.jsx(n.strong,{children:"O(1) lookups"})," for node depth."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"node-highlights--search-support",children:"Node Highlights & Search Support"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"highlightedLabelSegment"})," prop provides ",e.jsx(n.strong,{children:"search-aware highlighting"})," within node labels. This is purely visual and does ",e.jsx(n.strong,{children:"not modify the underlying data"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"drag-and-drop-awareness",children:"Drag-and-Drop Awareness"}),`
`,e.jsxs(n.p,{children:["The component is ",e.jsx(n.strong,{children:"DnD-aware"})," but ",e.jsx(n.strong,{children:"decoupled from any DnD library"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Dropzones are selectively enabled per node - you control which nodes display drop targets"}),`
`,e.jsx(n.li,{children:"Actual drag/drop logic is delegated to the host app"}),`
`,e.jsxs(n.li,{children:["Enables ",e.jsx(n.strong,{children:"flexible integration"})," without locking the component to a specific DnD solution"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"performance-optimizations",children:"Performance Optimizations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Depth Map Memoization:"})," precomputes node depth for O(1) lookups"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Stable Resolver References:"})," avoids unnecessary re-renders"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Flat Metadata Lookup:"})," enables large, nested trees to remain responsive"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pure Hooks:"})," minimal side effects, consistent UI behavior"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-overview",children:"Props Overview"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"resolvers"})," – Object of resolver functions (",e.jsx(n.code,{children:"getLabelTypographyProps"}),", ",e.jsx(n.code,{children:"getStartIconProps"}),", ",e.jsx(n.code,{children:"getEndIconButtonProps"}),", ",e.jsx(n.code,{children:"getTreeItemProps"}),", ",e.jsx(n.code,{children:"isItemDisabled"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"highlightedLabelSegment"})," – Supports search by visually highlighting matches"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"isDropzoneActive"})," – Toggles drag-and-drop UI state"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"variant"})," – Visual style of tree items (",e.jsx(n.code,{children:"standard"})," | ",e.jsx(n.code,{children:"outlined"}),"), default ",e.jsx(n.code,{children:"standard"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"slots"})," – Override default icons, tree item component, etc."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"slotProps"})," – Props passed to each slot (e.g., item)"]}),`
`,e.jsx(n.li,{children:"Other MUI TreeView props – Fully supported and forwarded"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"usage-highlights",children:"Usage Highlights"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"End icon buttons"})," appear on applicable nodes only"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Start icons"})," can be customized per node"]}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Component never mutates your original data"})}),`
`,e.jsx(n.li,{children:"Each node can have independent icons, buttons, styles, or dropzone behavior"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"technical-highlights",children:"Technical Highlights"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data-Pure Architecture:"})," keeps domain model and UI logic separate"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Highly Extensible:"})," slot overrides + resolver pattern"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"DnD-Aware:"})," UI responds to drag/drop state without binding to any library"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Performance-Optimized:"})," depth map, stable references, memoized resolvers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React-Friendly:"})," minimal re-renders, pure hooks, predictable behavior"]}),`
`]})]})}function l(s={}){const{wrapper:n}=Object.assign({},o(),s.components);return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const r={title:"Stories/RichTree/Description",tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:l};const v=["__page"];export{v as __namedExportsOrder,d as __page,r as default};
