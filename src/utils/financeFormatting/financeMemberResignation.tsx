//utils
import { fCurrency } from 'utils/formatNumber';
import { fDate } from 'utils/formatTime';

//type
import { SimpananWajib as SimpananWajibType } from '../../@types/simpanan';
import { SisaHasilUsaha as SisaHasilUsahaType } from '../../@types/sisa-hasil-usaha';

export function fHTML(report: string) {
  const jsonReport: {
    saldo: number;
    simpananPokok: number;
    simpananWajibList: SimpananWajibType[];
    simpananSukarela: number;
    sisaHasilUsahaList: SisaHasilUsahaType[];
  } = JSON.parse(report);
  let total = jsonReport.saldo + jsonReport.simpananPokok + jsonReport.simpananSukarela;
  for (let i = 0; i < jsonReport.simpananWajibList.length; i++) {
    total += jsonReport.simpananWajibList[i].amount;
  }
  for (let i = 0; i < jsonReport.sisaHasilUsahaList.length; i++) {
    total += jsonReport.sisaHasilUsahaList[i].total_cost;
  }
  return (
    <>
      <pre>Saldo:&nbsp;{fCurrency(jsonReport.saldo)}</pre>
      <pre>Simpanan pokok:&nbsp;{fCurrency(jsonReport.simpananPokok)}</pre>
      <pre>Simpanan wajib:</pre>
      {jsonReport.simpananWajibList.map((simpananWajib: SimpananWajibType) => (
        <>
          <pre>
            - &#9; Periode {fDate(new Date(simpananWajib.period))}:{' '}
            {fCurrency(simpananWajib.amount)}
          </pre>
        </>
      ))}
      <pre>
        Simpanan sukarela:&nbsp;
        {fCurrency(jsonReport.simpananSukarela)}
      </pre>
      <pre>Sisa hasil usaha:</pre>
      {jsonReport.sisaHasilUsahaList.map((sisaHasilUsaha: SisaHasilUsahaType) => (
        <>
          <pre>
            - &#9; Periode {fDate(new Date(sisaHasilUsaha.periode))}:{' '}
            {fCurrency(sisaHasilUsaha.total_cost)}
          </pre>
        </>
      ))}
      <hr />
      <pre>Total:&nbsp;{fCurrency(total)}</pre>
    </>
  );
}
