type destinationDetailsPageProps = {
  params: Promise<{
    id: string;
  }>
}

const DestinationDetailsPage = async({ params }: destinationDetailsPageProps) => {
  const { id } = await params
  console.log(id);
  return (
    <div>
      Destination Details Page
    </div>
  );
};

export default DestinationDetailsPage;