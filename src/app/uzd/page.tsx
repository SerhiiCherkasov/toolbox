import {
  FuelIcon,
  HardDriveDownloadIcon,
  Flame,
  Pause,
  StepForwardIcon,
  OctagonPauseIcon,
  ThermometerIcon,
  GaugeIcon,
  BatteryChargingIcon,
  BatteryFullIcon,
  DatabaseZapIcon,
  TriangleAlertIcon,
} from "lucide-react";

type UZDProps = {};

const UZD = ({}: UZDProps) => {
  return (
    <div className="flex w-full h-[100vh] items-center justify-center">
      <div className="w-[1024px] h-[600px] overflow-hidden">
        <div className="bg-green-900 px-4 pt-2 ">
          <div className="flex justify-between text-xl border-b border-white pb-2">
            <p className="text-[32px]">Бригада: 15823245</p>
            <p className="text-[32px]">15 січня 2025 р. 10:10</p>
          </div>
          <div className="w-full flex gap-1 py-2">
            <div className="w-full flex flex-col gap-1">
              <div className="w-full px-4 py-3 border border-white">
                <h2 className="text-[28px]">Паливо</h2>
                <div className="flex items-center gap-4">
                  <FuelIcon size={32} />
                  <p className="text-[42px] leading-[52px] font-bold"> 9999</p>
                  <p className="text-[32px]">л.</p>
                </div>
                <div className="flex items-center gap-4">
                  <HardDriveDownloadIcon size={32} />
                  <p className="text-[42px] leading-[52px] font-bold"> 9999</p>
                  <p className="text-[32px]">л.</p>
                </div>
                <div className="flex items-center gap-4">
                  <Flame size={32} />
                  <p className="text-[42px] leading-[52px] font-bold"> 999</p>
                  <p className="text-[32px]">л.</p>
                </div>
              </div>
              <div className="w-full px-4 py-2  border border-white">
                <h2 className="text-[28px]">Режими</h2>
                <div className="flex items-center gap-4">
                  <StepForwardIcon size={32} />
                  <p className="text-[42px] leading-[52px] font-bold"> 02:15</p>
                </div>
                <div className="flex items-center gap-4">
                  <Pause size={32} />
                  <p className="text-[42px] leading-[52px] font-bold"> 05:25</p>
                </div>
                <div className="flex items-center gap-4">
                  <OctagonPauseIcon size={32} />
                  <p className="text-[42px] leading-[52px] font-bold"> 00:35</p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 py-2  border border-white">
              <h2 className="text-[28px]">Датчики</h2>
              <div className="flex items-center gap-4">
                <ThermometerIcon size={32} />
                <p className="text-[42px] leading-[52px]  font-bold"> 90°</p>
              </div>
              <div className="flex items-center gap-4">
                <GaugeIcon size={32} />
                <p className="text-[42px] leading-[52px] font-bold"> 1900</p>
                <p className="text-[32px]"> об/хв</p>
              </div>
              <div className="flex items-center gap-4">
                <BatteryChargingIcon size={32} />
                <p className="text-[42px] leading-[52px] font-bold"> 750</p>
                <p className="text-[32px]">V</p>
              </div>
              <div className="flex items-center gap-4">
                <BatteryFullIcon size={32} />
                <p className="text-[42px] leading-[52px] font-bold"> 3500</p>
                <p className="text-[32px]">A</p>
              </div>
              <div className="flex items-center gap-4">
                <DatabaseZapIcon size={32} />
                <p className="text-[42px] leading-[52px] font-bold"> 1800</p>
                <p className="text-[32px]">кВт</p>
              </div>
            </div>
            <div className="w-[300px] px-4 py-4  border border-white flex flex-col gap-4">
              <h2 className="text-[28px]">Діагностика</h2>
              <div className="flex items-center justify-center border border-white px-10">
                <p className="text-[36px] font-bold">ДРП</p>
              </div>
              <div className="flex items-center justify-center border border-white px-10">
                <p className="text-[36px] font-bold">ДТ</p>
              </div>
              <div className="flex items-center justify-center border border-white px-10">
                <p className="text-[36px] font-bold">КМ</p>
              </div>
              <div className="flex items-center justify-center border border-white px-10">
                <p className="text-[36px] font-bold">КСУ</p>
              </div>
              <div className="flex items-center justify-center border border-white px-10">
                <p className="text-[36px] font-bold">ОД</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-20 flex items-center gap-10 px-4 bg-red-900">
          <div className="flex items-center gap-4">
            <TriangleAlertIcon size={42} />
            <p className="text-[42px]">Підтоварна вода!</p>
          </div>
          <div className="flex items-center gap-4">
            <TriangleAlertIcon size={42} />
            <p className="text-[42px]">Залишок палива 10%!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UZD;
