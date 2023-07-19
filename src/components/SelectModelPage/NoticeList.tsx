import styled from "styled-components";

export const NoticeList = () => {
  return (
    <NoticeListDiv>
      <NoticeListWrap>
        <Notice>
          * 상기 모델 별 차량이미지는 예시이므로 실제와 다를 수 있습니다.
        </Notice>
        <Notice>
          * 상기 금액은 세제 혜택 반영 전 금액으로 견적 완료 시 세제 혜택이
          적용된 금액 확인이 가능합니다.
        </Notice>
      </NoticeListWrap>
    </NoticeListDiv>
  );
};

const NoticeListDiv = styled.div`
  margin-top: 5px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeListWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Notice = styled.p`
  margin-bottom: 8px;
  color: grey;
  font-size: 10px;
`;
