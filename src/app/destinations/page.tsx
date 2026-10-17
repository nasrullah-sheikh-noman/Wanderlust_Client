export const instant = false

const DestinatiosPage = async () => {
  const res = await fetch('http://localhost:8000/all-destinations');
  const destinations = await res.json();
  // console.log("all destinations ", destinations);
  return (
    <div>
      <h1 className="text-2xl font-bold">All Destinations</h1>
      <div>
        {
          destinations.map(destination => <div key={destination._id}>
            {destination.description}
          </div>)
        }
      </div>
    </div>
  );
};

export default DestinatiosPage;