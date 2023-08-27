"use Client";
interface DisclaimerProps {
  title: string;
  textDisclamer: string;
}

export const Disclaimer = ({ title, textDisclamer }: DisclaimerProps) => {
  return (
    <div className="bg-red-500 mt-2 px-10 py-5 rounded-lg">
      <h4 className="text-left text-white text-2xl">{title}</h4>
      <p className="text-sm">{textDisclamer}</p>
    </div>
  );
};
