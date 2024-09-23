export default function Page({
  params,
}: {
  params: {
    id: string | string[];
  };
}) {
  return <h1> {params.id} 영화 상세 페이지</h1>;
}
