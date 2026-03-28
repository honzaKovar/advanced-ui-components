import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{g as E,c as l,t as S,R as u,T as z}from"./PlayoutTrimmer-DCvI5tmq.js";import{r as m}from"./index-CTjT7uj6.js";import"./assertThisInitialized-BhlF73o5.js";import"./index-CpHeDkVl.js";const j=(o,r,n=[])=>{const e=m.useMemo(()=>E(o),[o]),t=m.useRef(r);return t.current=r,m.useMemo(()=>t.current({depthMap:e}),[e,...n])},B={Workspace:0,Group:2,Folder:3,Item:4},I=["#EE7D20","#46B337","#9EBD2E","#37B37E","#AC4EDF","#46C6C8"],p=[{id:"workspace-1",label:"Workspace 1",children:[{id:"section-1",label:"Section A",children:[{id:"group-1",label:"Group 1",children:[{id:"folder-1",label:"Folder Alpha",children:[{id:"item-1",label:"Item 1",mediaType:"file"},{id:"item-2",label:"Item 2",mediaType:"file"},{id:"item-3",label:"Item 3",mediaType:"file"}]}]},{id:"group-2",label:"Group 2",children:[{id:"folder-2",label:"Folder Beta",children:[{id:"empty-folder",label:"Empty Folder"}]},{id:"folder-3",label:"Folder Gamma",children:[{id:"item-4",label:"Item 4",mediaType:"file"}]}]},{id:"misc-1",label:"Misc 1"},{id:"misc-2",label:"Misc 2"},{id:"misc-3",label:"Misc 3"},{id:"misc-4",label:"Misc 4"}]},{id:"section-2",label:"Section B"}]},{id:"workspace-2",label:"Workspace 2",children:[{id:"section-3",label:"Section C"}]}],A={checkboxSelection:{control:"boolean"},isItemEditable:{control:"boolean"},variant:{control:"radio",options:["standard","outlined"]}},k={checkboxSelection:!1,highlightedLabelSegment:"",isItemEditable:!1,variant:"standard"},M=l([s.jsx("path",{d:"M5 18.08V19h.92l9.06-9.06-.92-.92z",opacity:".3"},"0"),s.jsx("path",{d:"M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06.92.92z"},"1")]),b=l(s.jsx("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z"})),D=l(s.jsx("path",{d:"m3.5 18.99 11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12z"})),N=l(s.jsx("path",{d:"M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4"})),V={[`& > .${S.content}`]:{height:40}},_={color:"purple"},T=()=>{const o=Math.floor(Math.random()*I.length);return I[o]},{Folder:c,Group:F,Item:f,Workspace:x}=B,W=(o,r)=>j(o,({depthMap:n})=>({getEndIconButtonProps:({id:e})=>{if(n.get(e)===c)return{Icon:M,onClick:t=>{t.stopPropagation(),r(e)},show:!0}},getLabelTypographyProps:({id:e})=>{if(n.get(e)===x)return{color:"textSecondary",variant:"subtitle1"}},getStartIconProps:({id:e,mediaType:t})=>{const i=n.get(e);if(i===x)return{Icon:N,IconProps:{sx:{color:T()}},show:!0};if(i===F)return{Icon:b,IconProps:{sx:{color:T()}},show:!0};if(i===c)return{Icon:b,show:!0};if(i===f&&t)return{Icon:D,IconProps:{sx:_},show:!0}},getTreeItemProps:({id:e})=>{if(n.get(e)===c)return{hasDropzone:!0,sx:V}},isItemDisabled:({children:e,id:t,mediaType:i})=>{const g=n.get(t);return g===f&&i?!1:!e&&g!==c}}),[r]),h=({items:o,...r})=>{const e=W(o,t=>console.log("Clicked on node with id: ",t));return s.jsx(u,{items:o,resolvers:e,...r})};try{h.displayName="CustomizedRichTreeViewPro",h.__docgenInfo={description:"",displayName:"CustomizedRichTreeViewPro",props:{}}}catch{}const a={argTypes:{...A,items:p},args:{...k,items:p},render:({containerWidth:o,...r})=>s.jsx(z,{children:s.jsx(u,{sx:{width:360},...r})})},d={argTypes:{...A,isDropzoneActive:{control:"boolean"}},args:{...k,isDropzoneActive:!1,items:p},render:({containerWidth:o,...r})=>s.jsx(z,{children:s.jsx(h,{sx:{width:360},...r})})},K={component:u};var P,w,y;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  argTypes: {
    ...sharedArgTypes,
    items: mockedBaseItems
  },
  args: {
    ...sharedArgs,
    items: mockedBaseItems
  },
  render: ({
    containerWidth,
    ...restArgs
  }) => <ThemeProvider>\r
      <RichTreeViewPro sx={{
      width: 360
    }} {...restArgs} />\r
    </ThemeProvider>
}`,...(y=(w=a.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var C,R,v;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  argTypes: {
    ...sharedArgTypes,
    isDropzoneActive: {
      control: "boolean"
    }
  },
  args: {
    ...sharedArgs,
    isDropzoneActive: false,
    items: mockedBaseItems
  },
  render: ({
    containerWidth,
    ...restArgs
  }) => <ThemeProvider>\r
      <CustomizedRichTreeViewPro sx={{
      width: 360
    }} {...restArgs} />\r
    </ThemeProvider>
}`,...(v=(R=d.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};const Q=["ConfigurableTree","AdvancedCustomization"];export{d as AdvancedCustomization,a as ConfigurableTree,Q as __namedExportsOrder,K as default};
