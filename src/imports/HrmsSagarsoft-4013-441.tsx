import svgPaths from "./svg-iup7jgwi8m";
import imgSagarsoftLogo from "figma:asset/5e84dbe916feedfd8554f0268000392b84c23eb0.png";

function SagarsoftLogo() {
  return (
    <div className="h-[63px] relative shrink-0 w-[225px]" data-name="SagarsoftLogo">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSagarsoftLogo} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] w-[225px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[63px] relative shrink-0 w-[255px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[63px] items-center justify-center pl-0 pr-[0.016px] py-0 relative w-[255px]">
        <SagarsoftLogo />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[64px] relative shrink-0 w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[64px] items-center justify-center pb-px pt-0 px-0 relative w-[255px]">
        <Container />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p2f091200} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p39897300} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[21px] relative shrink-0 w-[67.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[67.719px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Dashboard
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_4013_583)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
          <path d="M7 9.33333V7" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
          <path d="M7 4.66667H7.00583" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_4013_583">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[99.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[99.344px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.8)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Organization Info
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[35.5px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[35.5px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_4013_541)" id="Icon">
          <path d={svgPaths.p15b14d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
          <path d={svgPaths.p3a5f7c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
          <path d={svgPaths.p464d180} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_4013_541">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[85.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[85.594px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.8)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Business Units
        </p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[35.5px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[35.5px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon2 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1c5c2e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
          <path d={svgPaths.p172bc380} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
          <path d="M4.66667 3.5V8.16667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[94.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[94.734px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.8)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Announcements
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[35.5px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[35.5px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon3 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p9425c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
          <path d={svgPaths.p3a4d2d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[75.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[75.219px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.8)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Departments
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[35.5px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[35.5px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon4 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] h-[154px] items-start left-[16px] pl-[18px] pr-0 py-0 top-[45px] w-[223px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_2px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none" />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4013_562)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4013_562">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[21px] left-0 text-[#f38883] text-[14px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Organization
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[108.188px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[21px] items-center relative w-[108.188px]">
        <Icon5 />
        <Text5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #F38883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute box-border content-stretch flex h-[41px] items-center justify-between left-0 px-[12px] py-0 rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[239px]" data-name="Button">
      <Container3 />
      <Icon6 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[199px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Button5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4013_500)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p224042c0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4013_500">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[62.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[62.344px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          My Profile
        </p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon7 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p3b6ee540} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[21px] relative shrink-0 w-[68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[68px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Employees
        </p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon8 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4013_571)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4013_571">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[71.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[71.328px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Attendance
        </p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon9 />
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #EEEEEE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #EEEEEE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #EEEEEE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #EEEEEE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[123.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[123.281px]">
        <p className="absolute font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[21px] left-0 text-[#eeeeee] text-[14px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Leave Management
        </p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[41px] relative rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon10 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[81px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[81px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(238,238,238,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Performance
        </p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon11 />
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 1.33333V14.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p5120400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[21px] relative shrink-0 w-[42.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[42.297px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Payroll
        </p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon12 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[21px] relative shrink-0 w-[71.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[71.016px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          HR Policies
        </p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon13 />
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p5a98780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p18f4d100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d="M8 11.6667V4.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Expenses
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[87.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[21px] items-center relative w-[87.797px]">
        <Icon14 />
        <Text13 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[41px] items-center justify-between px-[12px] py-0 relative w-full">
          <Container5 />
          <Icon15 />
        </div>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1bb15080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[69.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[69.031px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Grievances
        </p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon16 />
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2c1f680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d="M14 8H6" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
          <path d={svgPaths.p12257fa0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[21px] relative shrink-0 w-[77px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[77px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.9)] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Exit Process
        </p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[41px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[41px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon17 />
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[694px] items-start relative shrink-0 w-full" data-name="Navigation">
      <Button />
      <Container4 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[255px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pb-0 pt-[16px] px-[8px] relative rounded-[inherit] w-[255px]">
        <Navigation />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#2d2d58] h-[952px] relative shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[256px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[952px] items-start relative w-[256px]">
        <Container1 />
        <Container6 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M3.33333 10H16.6667" id="Vector" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 15H16.6667" id="Vector_2" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 5H16.6667" id="Vector_3" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon18 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Employee Self Service
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[36px] relative shrink-0 w-[189.266px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[36px] items-center relative w-[189.266px]">
        <Button16 />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[14.438px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p25db4200} id="Vector" stroke="var(--stroke-0, #2D2D58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.20312" />
          <path d={svgPaths.p21cb400} id="Vector_2" stroke="var(--stroke-0, #2D2D58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.20312" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(100,116,139,0.7)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search...
        </p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-gradient-to-r box-border content-stretch flex from-[rgba(227,242,253,0.5)] gap-[8px] h-[34px] items-center left-0 px-[13px] py-px rounded-[12px] to-[#eff6ff] top-px w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(45,45,88,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Icon19 />
      <Input />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#1e1e2d] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sanjay Kumar
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[16px] left-0 text-[12px] text-nowrap text-slate-500 top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Officer - Emp ID: PNB12345
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[52px] top-0 w-[148.172px]" data-name="App">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[208.17px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="basis-0 bg-gradient-to-b from-[#2d2d58] grow h-[32px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0 to-[#2171b5]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          SK
        </p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] overflow-clip rounded-[3.35544e+07px] size-[32px] top-[2px]" data-name="Primitive.span">
      <Text16 />
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute h-[36px] left-[316px] rounded-[10px] top-0 w-[236.172px]" data-name="Button">
      <App />
      <Icon20 />
      <PrimitiveSpan />
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p31962400} id="Vector" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1f3d9f80} id="Vector_2" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function App1() {
  return <div className="absolute bg-gradient-to-b from-[#ff6b35] left-[24px] opacity-[0.656] rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[8px] to-[#e55a2b] top-[4px]" data-name="App" />;
}

function Button18() {
  return (
    <div className="absolute left-[268px] rounded-[10px] size-[36px] top-0" data-name="Button">
      <Icon21 />
      <App1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[36px] relative shrink-0 w-[552.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[552.172px]">
        <Container8 />
        <Button17 />
        <Button18 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-[1293px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[64px] items-center justify-between pb-px pt-0 px-[24px] relative w-[1293px]">
        <Container7 />
        <Container9 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[24px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[20px] text-black tracking-[-0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Leave Management
      </p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[15px] text-nowrap text-slate-500 top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Apply and track your leave requests
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48px] relative shrink-0 w-[235.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[48px] items-start relative w-[235.906px]">
        <Heading1 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-[#2d2d58] h-[36px] relative rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(45,45,88,0.3)] shrink-0 w-[152.984px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[152.984px]">
        <Icon22 />
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] left-[44px] text-[14px] text-nowrap text-white top-[7px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apply for Leave
        </p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Button19 />
    </div>
  );
}

function CardTitle() {
  return (
    <div className="h-[20px] relative shrink-0 w-[83.453px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[83.453px]">
        <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[20px] left-0 text-[#2d2d58] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Casual Leave
        </p>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_58.33%_83.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M1 1V2.66667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_41.67%_83.33%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M1 1V2.66667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_8.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-7.69%_-5.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13">
            <path d={svgPaths.pc605440} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[83.33%] left-1/4 right-3/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M1 1V2.66667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[3.35544e+07px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon23 />
      </div>
    </div>
  );
}

function LeaveModule() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[26px] top-[26px] w-[243px]" data-name="LeaveModule">
      <CardTitle />
      <Container12 />
    </div>
  );
}

function LeaveModule1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#f54900] text-[30px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        8
      </p>
    </div>
  );
}

function LeaveModule2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[124px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        of 12 days available
      </p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[80px] items-start left-[2px] px-[24px] py-0 top-[100px] w-[291px]" data-name="CardContent">
      <LeaveModule1 />
      <LeaveModule2 />
    </div>
  );
}

function Card() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#cacaca] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LeaveModule />
      <CardContent />
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.672px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[67.672px]">
        <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[20px] left-0 text-[#2d2d58] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sick Leave
        </p>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 17">
            <path d={svgPaths.p32bf2600} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[3.35544e+07px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon24 />
      </div>
    </div>
  );
}

function LeaveModule3() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[26px] top-[26px] w-[243px]" data-name="LeaveModule">
      <CardTitle1 />
      <Container13 />
    </div>
  );
}

function LeaveModule4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#f54900] text-[30px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        6
      </p>
    </div>
  );
}

function LeaveModule5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[124px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        of 10 days available
      </p>
    </div>
  );
}

function CardContent1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[80px] items-start left-[2px] px-[24px] py-0 top-[100px] w-[291px]" data-name="CardContent">
      <LeaveModule4 />
      <LeaveModule5 />
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#cacaca] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LeaveModule3 />
      <CardContent1 />
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[84.359px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[84.359px]">
        <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[20px] left-0 text-[#2d2d58] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Earned Leave
        </p>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[11.72%_11.72%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p27f09c80} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[3.35544e+07px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon25 />
      </div>
    </div>
  );
}

function LeaveModule6() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[26px] top-[26px] w-[243px]" data-name="LeaveModule">
      <CardTitle2 />
      <Container14 />
    </div>
  );
}

function LeaveModule7() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#f54900] text-[30px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        12
      </p>
    </div>
  );
}

function LeaveModule8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[124px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        of 15 days available
      </p>
    </div>
  );
}

function CardContent2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[80px] items-start left-[2px] px-[24px] py-0 top-[100px] w-[291px]" data-name="CardContent">
      <LeaveModule7 />
      <LeaveModule8 />
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_3] bg-white relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#cacaca] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LeaveModule6 />
      <CardContent2 />
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.219px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[60.219px]">
        <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[20px] left-0 text-[#2d2d58] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Comp Off
        </p>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[58.33%_26.67%_28.33%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-31.25%_-62.51%_-31.25%_-62.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 5">
            <path d="M1 1V2.83333L2.33333 3.66667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 1V4.33333" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p2b550f80} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_66.67%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5.16667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 1V4.33333" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_8.33%_8.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[3.35544e+07px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon26 />
      </div>
    </div>
  );
}

function LeaveModule9() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[26px] top-[26px] w-[243px]" data-name="LeaveModule">
      <CardTitle3 />
      <Container15 />
    </div>
  );
}

function LeaveModule10() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#f54900] text-[30px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function LeaveModule11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="LeaveModule">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[116px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        of 5 days available
      </p>
    </div>
  );
}

function CardContent3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[80px] items-start left-[2px] px-[24px] py-0 top-[100px] w-[291px]" data-name="CardContent">
      <LeaveModule10 />
      <LeaveModule11 />
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_4] bg-white relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#cacaca] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LeaveModule9 />
      <CardContent3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[182px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="[grid-area:1_/_1] relative shrink-0" data-name="CardTitle">
      <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[16px] left-0 text-[#2d2d58] text-[16px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Leave History
      </p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="[grid-area:2_/_1] relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-slate-500 top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Track all your leave applications
      </p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute box-border gap-[6px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[16px_minmax(0px,_1fr)] h-[70px] left-px pb-0 pt-[24px] px-[24px] top-px w-[1226px]" data-name="CardHeader">
      <CardTitle4 />
      <CardDescription />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[95.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[95.016px]">
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[24px] left-0 text-[#1e1e2d] text-[16px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Casual Leave
        </p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#ff6b35] h-[22px] relative rounded-[10px] shrink-0 w-[62px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[62px]">
        <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Pending
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[993.234px]" data-name="Container">
      <Icon27 />
      <Text17 />
      <Badge />
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M4 1V3" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1V3" id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p333d5300} id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 5H10.5" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[114.062px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[114.062px]">
        <Icon28 />
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-[16px] text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Oct 15-16, 2025
        </p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[40.625px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[41px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          2 days
        </p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[20px] items-center left-[24px] top-[28px] w-[969.234px]" data-name="Container">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[52px] w-[969.234px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[150px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Reason: Family function
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[76px] w-[969.234px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[16px] left-0 text-[12px] text-slate-500 top-0 w-[124px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Applied on: Oct 9, 2025
      </p>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[92px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[92px] relative w-full">
        <Container17 />
        <Container18 />
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p257d040} id="Vector" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p8f3db80} id="Vector_2" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-[#f5f7fa] h-[32px] relative rounded-[10px] shrink-0 w-[61.906px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[61.906px]">
        <Icon29 />
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] left-[27px] text-[#1e1e2d] text-[14px] text-nowrap top-[5px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Edit
        </p>
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M9 3L3 9" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 3L9 9" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="basis-0 bg-[#f5f7fa] grow h-[32px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon30 />
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] left-[27px] text-[#e7000b] text-[14px] text-nowrap top-[5px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cancel
        </p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[32px] relative shrink-0 w-[150.766px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative w-[150.766px]">
        <Button20 />
        <Button21 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[126px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex h-[126px] items-start justify-between pb-px pt-[17px] px-[17px] relative w-full">
          <Container19 />
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[76.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[76.563px]">
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[24px] left-0 text-[#1e1e2d] text-[16px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sick Leave
        </p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#00a63e] h-[22px] relative rounded-[10px] shrink-0 w-[69.234px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[69.234px]">
        <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Approved
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[1075.5px]" data-name="Container">
      <Icon31 />
      <Text20 />
      <Badge1 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M4 1V3" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1V3" id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p333d5300} id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 5H10.5" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[86.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[86.594px]">
        <Icon32 />
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-[16px] text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Oct 5, 2025
        </p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[33.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[33.391px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[34px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          1 day
        </p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[20px] items-center left-[24px] top-[28px] w-[1051.5px]" data-name="Container">
      <Text21 />
      <Text22 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[52px] w-[1051.5px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[159px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Reason: Medical checkup
      </p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[76px] w-[1051.5px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[16px] left-0 text-[12px] text-slate-500 top-0 w-[124px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Applied on: Oct 4, 2025
      </p>
    </div>
  );
}

function Container24() {
  return (
    <div className="basis-0 grow h-[92px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[92px] relative w-full">
        <Container22 />
        <Container23 />
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2ab476c0} id="Vector" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-[#f5f7fa] h-[32px] relative rounded-[10px] shrink-0 w-[68.5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[68.5px]">
        <Icon33 />
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] left-[27px] text-[#1e1e2d] text-[14px] text-nowrap top-[5px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          View
        </p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[126px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex h-[126px] items-start justify-between pb-px pt-[17px] px-[17px] relative w-full">
          <Container24 />
          <Button22 />
        </div>
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[24px] relative shrink-0 w-[95.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[95.922px]">
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[24px] left-0 text-[#1e1e2d] text-[16px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Earned Leave
        </p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#00a63e] h-[22px] relative rounded-[10px] shrink-0 w-[69.234px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[69.234px]">
        <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Approved
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[1075.5px]" data-name="Container">
      <Icon34 />
      <Text23 />
      <Badge2 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M4 1V3" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1V3" id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p333d5300} id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 5H10.5" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[116.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[116.125px]">
        <Icon35 />
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-[16px] text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sep 20-24, 2025
        </p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[40.625px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[41px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          5 days
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[20px] items-center left-[24px] top-[28px] w-[1051.5px]" data-name="Container">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[52px] w-[1051.5px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[109px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Reason: Vacation
      </p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[76px] w-[1051.5px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[16px] left-0 text-[12px] text-slate-500 top-0 w-[132px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Applied on: Sep 10, 2025
      </p>
    </div>
  );
}

function Container28() {
  return (
    <div className="basis-0 grow h-[92px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[92px] relative w-full">
        <Container26 />
        <Container27 />
        <Paragraph8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2ab476c0} id="Vector" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-[#f5f7fa] h-[32px] relative rounded-[10px] shrink-0 w-[68.5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[68.5px]">
        <Icon36 />
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] left-[27px] text-[#1e1e2d] text-[14px] text-nowrap top-[5px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          View
        </p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[126px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex h-[126px] items-start justify-between pb-px pt-[17px] px-[17px] relative w-full">
          <Container28 />
          <Button23 />
        </div>
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[24px] relative shrink-0 w-[95.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[95.016px]">
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[24px] left-0 text-[#1e1e2d] text-[16px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Casual Leave
        </p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-red-500 h-[22px] relative rounded-[10px] shrink-0 w-[64.875px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[64.875px]">
        <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Rejected
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[1075.5px]" data-name="Container">
      <Icon37 />
      <Text26 />
      <Badge3 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M4 1V3" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1V3" id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p333d5300} id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 5H10.5" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[97.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[97.547px]">
        <Icon38 />
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-[16px] text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Aug 12, 2025
        </p>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[33.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[33.391px]">
        <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[34px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          1 day
        </p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[20px] items-center left-[24px] top-[28px] w-[1051.5px]" data-name="Container">
      <Text27 />
      <Text28 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[52px] w-[1051.5px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-slate-500 top-[-1px] w-[143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Reason: Personal work
      </p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[76px] w-[1051.5px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[16px] left-0 text-[12px] text-slate-500 top-0 w-[133px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Applied on: Aug 10, 2025
      </p>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 grow h-[92px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[92px] relative w-full">
        <Container30 />
        <Container31 />
        <Paragraph10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2ab476c0} id="Vector" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="var(--stroke-0, #1E1E2D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="bg-[#f5f7fa] h-[32px] relative rounded-[10px] shrink-0 w-[68.5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[68.5px]">
        <Icon39 />
        <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] left-[27px] text-[#1e1e2d] text-[14px] text-nowrap top-[5px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          View
        </p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[126px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex h-[126px] items-start justify-between pb-px pt-[17px] px-[17px] relative w-full">
          <Container32 />
          <Button24 />
        </div>
      </div>
    </div>
  );
}

function LeaveModule12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[540px] items-start left-[25px] top-[95px] w-[1178px]" data-name="LeaveModule">
      <Container21 />
      <Container25 />
      <Container29 />
      <Container33 />
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white h-[660px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CardHeader />
      <LeaveModule12 />
    </div>
  );
}

function CardTitle5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[1175px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[1175px]">
        <p className="absolute font-['Roboto:Bold',_sans-serif] font-bold leading-[16px] left-0 text-[#2d2d58] text-[16px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Leave Policy Guidelines
        </p>
      </div>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        • Casual Leave: Apply at least 2 days in advance (except emergencies)
      </p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        • Sick Leave: Medical certificate required for 3+ consecutive days
      </p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        • Earned Leave: Apply at least 7 days in advance
      </p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        • Negative leave balance is not permitted by the system
      </p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-slate-500 top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        • All leave requests are subject to manager approval
      </p>
    </div>
  );
}

function LeaveModule13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1175px]" data-name="LeaveModule">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start relative w-[1175px]">
        <ListItem />
        <ListItem1 />
        <ListItem2 />
        <ListItem3 />
        <ListItem4 />
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white h-[228px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#ff6b35] border-[1px_1px_1px_4px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] h-[228px] items-start pl-[28px] pr-px py-[25px] relative w-full">
          <CardTitle5 />
          <LeaveModule13 />
        </div>
      </div>
    </div>
  );
}

function LeaveModule14() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[1190px] items-start relative shrink-0 w-full" data-name="LeaveModule">
      <Container11 />
      <Container16 />
      <Card4 />
      <Card5 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 bg-[#f5f7fa] grow min-h-px min-w-px relative shrink-0 w-[1293px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pb-0 pl-[25px] pr-[40px] pt-[25px] relative rounded-[inherit] w-[1293px]">
        <LeaveModule14 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="basis-0 grow h-[952px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[952px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="h-[952px] relative shrink-0 w-0" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[952px] w-0" />
    </div>
  );
}

export default function HrmsSagarsoft() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex items-start relative size-full" data-name="HRMS sagarsoft">
      <Sidebar />
      <Container34 />
      <Section />
    </div>
  );
}