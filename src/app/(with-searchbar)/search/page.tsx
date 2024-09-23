export default function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  return <h1>Search: {searchParams.q}</h1>;
}
