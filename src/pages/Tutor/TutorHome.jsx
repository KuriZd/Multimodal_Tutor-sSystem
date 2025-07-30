import GuiaRapidaSistema from "../../components/Tutor/GuiaRapidaSistema";
import BienvenidaTutor from "../../components/Tutor/Bienbenida";
import InformacionMiTutor from "../../components/Tutor/InformacionMiTutor";

const TutorHomeView = () => {
  return (
    <div className="flex justify-center space-x-56 p-4 mt-10">
      <div className="flex flex-col gap-4">
        <BienvenidaTutor />
        <GuiaRapidaSistema />
      </div>
      <InformacionMiTutor />
    </div>
  );
};

export default TutorHomeView;
