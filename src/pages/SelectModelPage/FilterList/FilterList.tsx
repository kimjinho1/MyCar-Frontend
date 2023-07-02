import {
  driveCodeState,
  engineCodeState,
  missionCodeState,
  modelFiltersState,
} from "@/stores";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

type FilterContainerProps = {
  selected: boolean;
};

export const FilterList = () => {
  const modelFilters = useRecoilValue(modelFiltersState);
  const { engines, missions, drives } = modelFilters;

  const [engineCode, setEngineCode] = useRecoilState(engineCodeState);
  const [missionCode, setMissionCode] = useRecoilState(missionCodeState);
  const [driveCode, setDriveCode] = useRecoilState(driveCodeState);

  const handleEngineClick = (engineCode: string) => {
    setEngineCode(engineCode);
    if (engineCode === "D") {
      setMissionCode(missions[0].missionCode);
    } else if (engineCode === "T") {
      setMissionCode(missions[1].missionCode);
    }
  };

  const handleDriveClick = (driveCode: string) => {
    setDriveCode(driveCode);
  };

  return (
    <FilterListDiv>
      <FilterListWrap>
        {engines.length === 0 ? null : (
          <FilterContainer>
            <p>엔진</p>
            <FilterWrap>
              {engines.map((engine) => {
                return (
                  <FilterDiv
                    key={engine.engineCode}
                    selected={engine.engineCode === engineCode}
                    onClick={() => handleEngineClick(engine.engineCode)}
                  >
                    <p>{engine.engineName}</p>
                  </FilterDiv>
                );
              })}
            </FilterWrap>
          </FilterContainer>
        )}
        {missions.length === 0 ? null : (
          <FilterContainer>
            <p>변속기</p>
            <FilterWrap>
              {missions.map((mission) => {
                return (
                  <FilterDiv
                    key={mission.missionCode}
                    selected={mission.missionCode === missionCode}
                  >
                    <p>{mission.missionName}</p>
                  </FilterDiv>
                );
              })}
            </FilterWrap>
          </FilterContainer>
        )}
        {drives.length === 0 ? null : (
          <FilterContainer>
            <p>구동방식</p>
            <FilterWrap>
              {drives.map((drive) => {
                return (
                  <FilterDiv
                    key={drive.driveCode}
                    selected={drive.driveCode === driveCode}
                    onClick={() => handleDriveClick(drive.driveCode)}
                  >
                    <p>{drive.driveCode}</p>
                  </FilterDiv>
                );
              })}
            </FilterWrap>
          </FilterContainer>
        )}
      </FilterListWrap>
    </FilterListDiv>
  );
};

const FilterListDiv = styled.div`
  width: 100%;
  margin-left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterListWrap = styled.div`
  width: 100%;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const FilterContainer = styled.div`
  margin: 10px 0;
  > p {
    margin: 0;
    font-size: 14px;
  }
`;

const FilterWrap = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterDiv = styled.div<FilterContainerProps>`
  width: 75px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "#007FA8" : "white")};
  border: ${({ selected }) =>
    selected ? "#007FA8 0.5px solid" : "grey 0.5px solid"};
  cursor: pointer;

  > p {
    margin: 0;
    font-size: 10px;
    color: ${({ selected }) => (selected ? "white" : "#606266")};
  }
`;
