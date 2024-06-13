
import IssuePage from "./(components)/IssuesPage";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <IssuePage />
      </div>
    </div>
  );
};

export default Home;
