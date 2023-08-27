"use Client";
interface DisclaimerProps {
  title: string;
  textDisclamer: string;
}

export const Disclaimer = ({ title, textDisclamer }: DisclaimerProps) => {
  return (
    <div className="bg-red-500 p-5 rounded-lg px-10">
      <p className="text-left text-white text-3xl ">{title}</p>
      <p className="text-sm text-white">{textDisclamer}</p>
    </div>
  );
};
