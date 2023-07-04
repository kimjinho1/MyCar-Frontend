import { getTrimInfos } from "@/apis/api";
import {
  driveCodeState,
  engineCodeState,
  missionCodeState,
  modelFiltersState,
  trimInfosState,
} from "@/stores";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

type FilterContainerProps = {
  selected: boolean;
};

export const FilterList = () => {
  const { carCode } = useParams();

  const modelFilters = useRecoilValue(modelFiltersState);
  const { engines, missions, drives } = modelFilters;
  const [engineCode, setEngineCode] = useRecoilState(engineCodeState);
  const [missionCode, setMissionCode] = useRecoilState(missionCodeState);
  const [driveCode, setDriveCode] = useRecoilState(driveCodeState);
  const setTrimInfos = useSetRecoilState(trimInfosState);

  const handleEngineClick = async (engineCode: string) => {
    setEngineCode(engineCode);
    if (carCode !== undefined && carCode === "NX05") {
      if (engineCode === "D") {
        setMissionCode(missions[0].missionCode);
        await updateTrimInfos(engineCode, missions[0].missionCode, driveCode);
      } else if (engineCode === "T") {
        setMissionCode(missions[1].missionCode);
        await updateTrimInfos(engineCode, missions[1].missionCode, driveCode);
      }
      return;
    }

    await updateTrimInfos(engineCode, missionCode, driveCode);
  };

  const handleDriveClick = async (driveCode: string) => {
    setDriveCode(driveCode);

    await updateTrimInfos(engineCode, missionCode, driveCode);
  };

  const updateTrimInfos = async (
    engineCode: string,
    missionCode: string,
    driveCode: string
  ) => {
    if (carCode !== undefined) {
      const getTrimInfosParam = {
        carCode: carCode,
        engineCode: engineCode,
        missionCode: missionCode,
        driveCode: driveCode,
      };
      const trimInfos = await getTrimInfos(getTrimInfosParam);
      setTrimInfos(trimInfos);
    }
  };

  return (
    <FilterListDiv>
      {engines.length < 2 ? null : (
        <FilterContainer>
          <p>엔진</p>
          <FilterDiv>
            {engines.map((engine) => {
              return (
                <FilterWrap
                  key={engine.engineCode}
                  selected={engine.engineCode === engineCode}
                  onClick={() => handleEngineClick(engine.engineCode)}
                >
                  <p>{engine.engineName}</p>
                </FilterWrap>
              );
            })}
          </FilterDiv>
        </FilterContainer>
      )}
      {missions.length < 2 ? null : (
        <FilterContainer>
          <p>변속기</p>
          <FilterDiv>
            {missions.map((mission) => {
              return (
                <FilterWrap
                  key={mission.missionCode}
                  selected={mission.missionCode === missionCode}
                >
                  <p>{mission.missionName}</p>
                </FilterWrap>
              );
            })}
          </FilterDiv>
        </FilterContainer>
      )}
      {drives.length < 2 ? null : (
        <FilterContainer>
          <p>구동방식</p>
          <FilterDiv>
            {drives.map((drive) => {
              return (
                <FilterWrap
                  key={drive.driveCode}
                  selected={drive.driveCode === driveCode}
                  onClick={() => handleDriveClick(drive.driveCode)}
                >
                  <p>{drive.driveName}</p>
                </FilterWrap>
              );
            })}
          </FilterDiv>
        </FilterContainer>
      )}
    </FilterListDiv>
  );
};

const FilterListDiv = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const FilterContainer = styled.div`
  > p {
    margin: 0;
    font-size: 14px;
  }
`;

const FilterDiv = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterWrap = styled.div<FilterContainerProps>`
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
