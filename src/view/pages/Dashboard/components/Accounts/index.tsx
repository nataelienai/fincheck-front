import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from '../../../../components/icons/EyeIcon';

import { AccountCard } from './AccountCard';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { useAccountsController } from './useAccountsController';

import 'swiper/css';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Spinner } from '../../../../components/Spinner';

export function Accounts() {
  const {
    sliderPosition,
    setSliderPosition,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 lg:p-10 flex flex-col gap-10 lg:gap-0">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/40 fill-white" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="leading-6 tracking-[-0.5px] text-white">
              Saldo total
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-[32px] leading-none tracking-[-1px] text-white font-bold',
                  !areValuesVisible && 'blur-md',
                )}
              >
                {formatCurrency(1000)}
              </strong>

              <button
                className="w-12 h-12 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            {/* Swiper bugs when its parent is flex */}
            <div>
              <Swiper
                spaceBetween={16}
                slidesPerView={windowWidth > 500 ? 2.1 : 1.2}
                onSlideChange={(swiper) => {
                  setSliderPosition({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  });
                }}
              >
                <div
                  className="flex items-center justify-between mb-4"
                  slot="container-start"
                >
                  <strong className="text-white text-lg leading-6 tracking-[-1px] font-bold">
                    Minhas Contas
                  </strong>

                  <AccountsSliderNavigation
                    isBeginning={sliderPosition.isBeginning}
                    isEnd={sliderPosition.isEnd}
                  />
                </div>

                <SwiperSlide>
                  <AccountCard
                    color="#7950F2"
                    name="Nubank"
                    balance={1000}
                    type="CHECKING"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <AccountCard
                    color="#333"
                    name="XP"
                    balance={1000}
                    type="INVESTMENT"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <AccountCard
                    color="#0f0"
                    name="Carteira"
                    balance={1000}
                    type="CASH"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
