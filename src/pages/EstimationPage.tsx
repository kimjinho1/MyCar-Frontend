import styled from "styled-components";
import { PageDiv, PageWrap } from "@/components/common/styles";
import { useSetRecoilState } from "recoil";
import { SelectedColor } from "@/stores/colorState";
import { ROUTE_PATH } from "@/Router";
import { useNavigate, useParams } from "react-router-dom";
import { HorizontalLine } from "@/components/common";
import { useImageUrl } from "@/hooks/utils/useImageUrl";
import { OPTION_TYPE } from "@/types/option";
import { useEffect, useState } from "react";
import { setErrorModalInfoState } from "@/stores/modalState";
import {
  ModelInfo,
  OptionInfo,
  defaultColor,
  defaultModelInfo,
} from "@/types/estimation";
import { getEstimation } from "@/services/option";
import { OptionList } from "@/components/EstimationPage";
import { CheckModal } from "@/components/modal/CheckModal";

export const EstimationPage = () => {
  const { estimationUrl } = useParams();
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const [modelInfo, setModelInfo] = useState<ModelInfo>(defaultModelInfo);
  const [intColor, setIntColor] = useState<SelectedColor>(defaultColor);
  const [extColor, setExtColor] = useState<SelectedColor>(defaultColor);
  const [detailOptions, setDetailOptions] = useState<OptionInfo[]>([]);
  const [hgaOptions, setHgaOptions] = useState<OptionInfo[]>([]);
  const [performanceOptions, setPerformanceOptions] = useState<OptionInfo[]>(
    []
  );
  const [optionTotalPrice, setOptionTotalPrice] = useState<number>(0);

  // 모달 관리
  const [isOpenCheckModal, setIsOpenCheckModal] = useState<boolean>(false);
  const onClose = () => {
    setIsOpenCheckModal(false);
  };

  const handleOnLogoClick = () => {
    setIsOpenCheckModal(true);
  };

  useEffect(() => {
    const fetchEstimaitionInfo = async () => {
      try {
        if (estimationUrl !== undefined) {
          const estimationInfo = await getEstimation(estimationUrl);
          const { modelInfo, intColor, extColor, options } = estimationInfo;
          setModelInfo(modelInfo);
          setIntColor(intColor);
          setExtColor(extColor);
          setOptionTotalPrice(
            options.reduce((sum, option) => sum + option.price, 0)
          );
          setDetailOptions(
            options.filter((option) => option.typeName === OPTION_TYPE.DETAIL)
          );
          setHgaOptions(
            options.filter((option) => option.typeName === OPTION_TYPE.HGA)
          );
          setPerformanceOptions(
            options.filter(
              (option) => option.typeName === OPTION_TYPE.PERFORMANCE
            )
          );
        }
      } catch (error: any) {
        setErrorModalInfo({
          messages: error.response.data.message,
          isRedirect: true,
        });
      }
    };
    fetchEstimaitionInfo();
  }, [estimationUrl]);

  return (
    <PageDiv>
      {isOpenCheckModal && (
        <CheckModal
          onClose={onClose}
          title={"차량 선택 페이지로 돌아가시겠습니까?"}
          path={ROUTE_PATH.ROOT}
        />
      )}
      <EstimationHeaderDiv>
        <img src={"/Logo.svg"} alt="현대 로고" onClick={handleOnLogoClick} />
      </EstimationHeaderDiv>

      <PageWrap>
        <ModelInfoDiv>
          <b>나의 {modelInfo.carName} (이)가 완성되었습니다!</b>
          <p>{modelInfo.fullName}</p>
        </ModelInfoDiv>
        <EstimationInfoContainerDiv>
          <EstimationInfoHeadDiv>
            <b>차량 선택사항</b>
            <TotalPriceDiv>
              <span>총 차량 가격</span>
              <b>{(modelInfo.price + optionTotalPrice).toLocaleString()} 원</b>
            </TotalPriceDiv>
          </EstimationInfoHeadDiv>

          <HorizontalLine height={2} />

          <EstimationInfoDiv>
            <OptionNamePriceDiv>
              <b>모델</b>
              <span>{modelInfo.price.toLocaleString()} 원</span>
            </OptionNamePriceDiv>
            <SelectedModelInfoDiv>
              <b>{modelInfo.fullName}</b>
            </SelectedModelInfoDiv>
          </EstimationInfoDiv>
          <HorizontalLine height={0.5} />

          <EstimationInfoDiv>
            <OptionNamePriceDiv>
              <b>색상</b>
              <span>추가금액 없음</span>
            </OptionNamePriceDiv>
            <SelectedColorInfoDiv>
              <b>외장색상</b>
              <img src={useImageUrl(extColor.imagePath)} />
              <span>{extColor.name}</span>
              <b>내장색상</b>
              <img src={useImageUrl(intColor.imagePath)} />
              <span>{intColor.name}</span>
            </SelectedColorInfoDiv>
          </EstimationInfoDiv>
          <HorizontalLine height={0.5} />

          <EstimationInfoDiv>
            <OptionNamePriceDiv>
              <b>옵션</b>
              <span>
                {optionTotalPrice > 0
                  ? `${optionTotalPrice.toLocaleString()} 원`
                  : "추가금액 없음"}
              </span>
            </OptionNamePriceDiv>
            <SelectedOptionInfoContainerWrap>
              {detailOptions.length > 0 && (
                <OptionList typeName={"옵션"} options={detailOptions} />
              )}

              {hgaOptions.length > 0 && (
                <>
                  {detailOptions.length > 0 && <HorizontalLine height={0.5} />}
                  <OptionList
                    typeName={"H Genuine Accessories"}
                    options={hgaOptions}
                  />
                </>
              )}

              {performanceOptions.length > 0 && (
                <>
                  <HorizontalLine height={0.5} />
                  <OptionList typeName={"N"} options={performanceOptions} />
                </>
              )}
            </SelectedOptionInfoContainerWrap>
          </EstimationInfoDiv>
          <HorizontalLine height={0.5} />
        </EstimationInfoContainerDiv>
      </PageWrap>
    </PageDiv>
  );
};

const EstimationHeaderDiv = styled.div`
  width: 100%;
  padding: 20px 25px;
  background-color: #e4dcd3;

  > img {
    width: 120px;
    margin-right: 15px;
    cursor: pointer;
  }
`;

const ModelInfoDiv = styled.div`
  width: 100%;
  margin: 40px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > b {
    font-size: 24px;
  }

  > p {
    margin: 20px 0;
    font-size: 18px;
    font-weight: bold;
  }
`;

const EstimationInfoContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EstimationInfoHeadDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  > b {
    font-size: 18px;
  }
`;

const TotalPriceDiv = styled.div`
  display: flex;
  align-items: center;

  > span {
    margin-right: 20px;
    font-size: 16px;
  }

  > b {
    font-size: 20px;
  }
`;

const EstimationInfoDiv = styled.div`
  width: 100%;
  padding: 25px 0;
  display: flex;
  justify-content: center;
`;

const OptionNamePriceDiv = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > b {
    font-size: 18px;
  }

  > span {
    font-size: 16px;
  }
`;

const SelectedModelInfoDiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  > b {
    white-space: nowrap;
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

const SelectedColorInfoDiv = styled.div`
  width: 80%;
  display: flex;

  > b {
    white-space: nowrap;
    margin-right: 15px;
    margin-bottom: 10px;
    font-size: 16px;
  }

  > img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  > span {
    margin-left: 15px;
    margin-right: 40px;
    color: grey;
    font-size: 15px;
  }
`;

const SelectedOptionInfoContainerWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
