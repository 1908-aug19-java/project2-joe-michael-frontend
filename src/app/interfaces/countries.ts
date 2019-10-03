export interface Countries {
    api: API;
}

export interface API {
    results: number;
    countries: Country[];
}

export interface Country {
    country: string;
    code: null | string;
    flag: null | string;
}

export const CountryList = {

    api: {
        results: 124,
        countries: [
            {
                country: 'Albania',
                code: 'AL',
                flag: 'https://media.api-football.com/flags/al.svg'
            },
            {
                country: 'Algeria',
                code: 'DZ',
                flag: 'https://media.api-football.com/flags/dz.svg'
            },
            {
                country: 'Andorra',
                code: 'AD',
                flag: 'https://media.api-football.com/flags/ad.svg'
            },
            {
                country: 'Angola',
                code: 'AO',
                flag: 'https://media.api-football.com/flags/ao.svg'
            },
            {
                country: 'Argentina',
                code: 'AR',
                flag: 'https://media.api-football.com/flags/ar.svg'
            },
            {
                country: 'Armenia',
                code: 'AM',
                flag: 'https://media.api-football.com/flags/am.svg'
            },
            {
                country: 'Australia',
                code: 'AU',
                flag: 'https://media.api-football.com/flags/au.svg'
            },
            {
                country: 'Austria',
                code: 'AT',
                flag: 'https://media.api-football.com/flags/at.svg'
            },
            {
                country: 'Azerbaidjan',
                code: 'AZ',
                flag: 'https://media.api-football.com/flags/az.svg'
            },
            {
                country: 'Bahrain',
                code: 'BH',
                flag: 'https://media.api-football.com/flags/bh.svg'
            },
            {
                country: 'Bangladesh',
                code: 'BD',
                flag: 'https://media.api-football.com/flags/bd.svg'
            },
            {
                country: 'Belarus',
                code: 'BY',
                flag: 'https://media.api-football.com/flags/by.svg'
            },
            {
                country: 'Belgium',
                code: 'BE',
                flag: 'https://media.api-football.com/flags/be.svg'
            },
            {
                country: 'Belize',
                code: 'BZ',
                flag: 'https://media.api-football.com/flags/bz.svg'
            },
            {
                country: 'Benin',
                code: 'BJ',
                flag: 'https://media.api-football.com/flags/bj.svg'
            },
            {
                country: 'Bermuda',
                code: 'BM',
                flag: 'https://media.api-football.com/flags/bm.svg'
            },
            {
                country: 'Bhutan',
                code: 'BT',
                flag: 'https://media.api-football.com/flags/bt.svg'
            },
            {
                country: 'Bolivia',
                code: 'BO',
                flag: 'https://media.api-football.com/flags/bo.svg'
            },
            {
                country: 'Bosnia',
                code: 'BA',
                flag: 'https://media.api-football.com/flags/ba.svg'
            },
            {
                country: 'Botswana',
                code: 'BW',
                flag: 'https://media.api-football.com/flags/bw.svg'
            },
            {
                country: 'Brazil',
                code: 'BR',
                flag: 'https://media.api-football.com/flags/br.svg'
            },
            {
                country: 'Bulgaria',
                code: 'BG',
                flag: 'https://media.api-football.com/flags/bg.svg'
            },
            {
                country: 'Cambodia',
                code: 'KH',
                flag: 'https://media.api-football.com/flags/kh.svg'
            },
            {
                country: 'Cameroon',
                code: 'CM',
                flag: 'https://media.api-football.com/flags/cm.svg'
            },
            {
                country: 'Canada',
                code: 'CA',
                flag: 'https://media.api-football.com/flags/ca.svg'
            },
            {
                country: 'Chile',
                code: 'CL',
                flag: 'https://media.api-football.com/flags/cl.svg'
            },
            {
                country: 'China',
                code: 'CN',
                flag: 'https://media.api-football.com/flags/cn.svg'
            },
            {
                country: 'Colombia',
                code: 'CO',
                flag: 'https://media.api-football.com/flags/co.svg'
            },
            {
                country: 'Costa-Rica',
                code: 'CR',
                flag: 'https://media.api-football.com/flags/cr.svg'
            },
            {
                country: 'Croatia',
                code: 'HR',
                flag: 'https://media.api-football.com/flags/hr.svg'
            },
            {
                country: 'Cyprus',
                code: 'CY',
                flag: 'https://media.api-football.com/flags/cy.svg'
            },
            {
                country: 'Czech-Republic',
                code: 'CZ',
                flag: 'https://media.api-football.com/flags/cz.svg'
            },
            {
                country: 'Denmark',
                code: 'DK',
                flag: 'https://media.api-football.com/flags/dk.svg'
            },
            {
                country: 'Ecuador',
                code: 'EC',
                flag: 'https://media.api-football.com/flags/ec.svg'
            },
            {
                country: 'Egypt',
                code: 'EG',
                flag: 'https://media.api-football.com/flags/eg.svg'
            },
            {
                country: 'El-Salvador',
                code: 'SV',
                flag: 'https://media.api-football.com/flags/sv.svg'
            },
            {
                country: 'England',
                code: 'GB',
                flag: 'https://media.api-football.com/flags/gb.svg'
            },
            {
                country: 'Estonia',
                code: 'EE',
                flag: 'https://media.api-football.com/flags/ee.svg'
            },
            {
                country: 'Ethiopia',
                code: 'ET',
                flag: 'https://media.api-football.com/flags/et.svg'
            },
            {
                country: 'Faroe-Islands',
                code: 'FO',
                flag: 'https://media.api-football.com/flags/fo.svg'
            },
            {
                country: 'Fiji',
                code: 'FJ',
                flag: 'https://media.api-football.com/flags/fj.svg'
            },
            {
                country: 'Finland',
                code: 'FI',
                flag: 'https://media.api-football.com/flags/fi.svg'
            },
            {
                country: 'France',
                code: 'FR',
                flag: 'https://media.api-football.com/flags/fr.svg'
            },
            {
                country: 'Georgia',
                code: 'GE',
                flag: 'https://media.api-football.com/flags/ge.svg'
            },
            {
                country: 'Germany',
                code: 'DE',
                flag: 'https://media.api-football.com/flags/de.svg'
            },
            {
                country: 'Greece',
                code: 'GR',
                flag: 'https://media.api-football.com/flags/gr.svg'
            },
            {
                country: 'Guadeloupe',
                code: 'GP',
                flag: 'https://media.api-football.com/flags/gp.svg'
            },
            {
                country: 'Guatemala',
                code: 'GT',
                flag: 'https://media.api-football.com/flags/gt.svg'
            },
            {
                country: 'Guinea',
                code: 'GN',
                flag: 'https://media.api-football.com/flags/gn.svg'
            },
            {
                country: 'Haiti',
                code: 'HT',
                flag: 'https://media.api-football.com/flags/ht.svg'
            },
            {
                country: 'Honduras',
                code: 'HN',
                flag: 'https://media.api-football.com/flags/hn.svg'
            },
            {
                country: 'Hong-Kong',
                code: 'HK',
                flag: 'https://media.api-football.com/flags/hk.svg'
            },
            {
                country: 'Hungary',
                code: 'HU',
                flag: 'https://media.api-football.com/flags/hu.svg'
            },
            {
                country: 'Iceland',
                code: 'IS',
                flag: 'https://media.api-football.com/flags/is.svg'
            },
            {
                country: 'India',
                code: 'IN',
                flag: 'https://media.api-football.com/flags/in.svg'
            },
            {
                country: 'Indonesia',
                code: 'ID',
                flag: 'https://media.api-football.com/flags/id.svg'
            },
            {
                country: 'Iran',
                code: 'IR',
                flag: 'https://media.api-football.com/flags/ir.svg'
            },
            {
                country: 'Ireland',
                code: 'IE',
                flag: 'https://media.api-football.com/flags/ie.svg'
            },
            {
                country: 'Israel',
                code: 'IL',
                flag: 'https://media.api-football.com/flags/il.svg'
            },
            {
                country: 'Italy',
                code: 'IT',
                flag: 'https://media.api-football.com/flags/it.svg'
            },
            {
                country: 'Ivory-Coast',
                code: 'CI',
                flag: 'https://media.api-football.com/flags/ci.svg'
            },
            {
                country: 'Jamaica',
                code: 'JM',
                flag: 'https://media.api-football.com/flags/jm.svg'
            },
            {
                country: 'Japan',
                code: 'JP',
                flag: 'https://media.api-football.com/flags/jp.svg'
            },
            {
                country: 'Jordan',
                code: 'JO',
                flag: 'https://media.api-football.com/flags/jo.svg'
            },
            {
                country: 'Kazakhstan',
                code: 'KZ',
                flag: 'https://media.api-football.com/flags/kz.svg'
            },
            {
                country: 'Kenya',
                code: 'KE',
                flag: 'https://media.api-football.com/flags/ke.svg'
            },
            {
                country: 'Kuwait',
                code: 'KW',
                flag: 'https://media.api-football.com/flags/kw.svg'
            },
            {
                country: 'Latvia',
                code: 'LV',
                flag: 'https://media.api-football.com/flags/lv.svg'
            },
            {
                country: 'Lebanon',
                code: 'LB',
                flag: 'https://media.api-football.com/flags/lb.svg'
            },
            {
                country: 'Lithuania',
                code: 'LT',
                flag: 'https://media.api-football.com/flags/lt.svg'
            },
            {
                country: 'Luxembourg',
                code: 'LU',
                flag: 'https://media.api-football.com/flags/lu.svg'
            },
            {
                country: 'Macedonia',
                code: 'MK',
                flag: 'https://media.api-football.com/flags/mk.svg'
            },
            {
                country: 'Malawi',
                code: 'MW',
                flag: 'https://media.api-football.com/flags/mw.svg'
            },
            {
                country: 'Malaysia',
                code: 'MY',
                flag: 'https://media.api-football.com/flags/my.svg'
            },
            {
                country: 'Malta',
                code: 'MT',
                flag: 'https://media.api-football.com/flags/mt.svg'
            },
            {
                country: 'Mexico',
                code: 'MX',
                flag: 'https://media.api-football.com/flags/mx.svg'
            },
            {
                country: 'Moldova',
                code: 'MD',
                flag: 'https://media.api-football.com/flags/md.svg'
            },
            {
                country: 'Montenegro',
                code: 'ME',
                flag: 'https://media.api-football.com/flags/me.svg'
            },
            {
                country: 'Morocco',
                code: 'MA',
                flag: 'https://media.api-football.com/flags/ma.svg'
            },
            {
                country: 'Namibia',
                code: 'NA',
                flag: 'https://media.api-football.com/flags/na.svg'
            },
            {
                country: 'Netherlands',
                code: 'NL',
                flag: 'https://media.api-football.com/flags/nl.svg'
            },
            {
                country: 'New-Zealand',
                code: 'NZ',
                flag: 'https://media.api-football.com/flags/nz.svg'
            },
            {
                country: 'Nicaragua',
                code: 'NI',
                flag: 'https://media.api-football.com/flags/ni.svg'
            },
            {
                country: 'Nigeria',
                code: 'NG',
                flag: 'https://media.api-football.com/flags/ng.svg'
            },
            {
                country: 'Northern-Ireland',
                code: 'GB',
                flag: 'https://media.api-football.com/flags/gb.svg'
            },
            {
                country: 'Norway',
                code: 'NO',
                flag: 'https://media.api-football.com/flags/no.svg'
            },
            {
                country: 'Oman',
                code: 'OM',
                flag: 'https://media.api-football.com/flags/om.svg'
            },
            {
                country: 'Panama',
                code: 'PA',
                flag: 'https://media.api-football.com/flags/pa.svg'
            },
            {
                country: 'Paraguay',
                code: 'PY',
                flag: 'https://media.api-football.com/flags/py.svg'
            },
            {
                country: 'Peru',
                code: 'PE',
                flag: 'https://media.api-football.com/flags/pe.svg'
            },
            {
                country: 'Poland',
                code: 'PL',
                flag: 'https://media.api-football.com/flags/pl.svg'
            },
            {
                country: 'Portugal',
                code: 'PT',
                flag: 'https://media.api-football.com/flags/pt.svg'
            },
            {
                country: 'Qatar',
                code: 'QA',
                flag: 'https://media.api-football.com/flags/qa.svg'
            },
            {
                country: 'Romania',
                code: 'RO',
                flag: 'https://media.api-football.com/flags/ro.svg'
            },
            {
                country: 'Russia',
                code: 'RU',
                flag: 'https://media.api-football.com/flags/ru.svg'
            },
            {
                country: 'Rwanda',
                code: 'RW',
                flag: 'https://media.api-football.com/flags/rw.svg'
            },
            {
                country: 'San-Marino',
                code: 'SM',
                flag: 'https://media.api-football.com/flags/sm.svg'
            },
            {
                country: 'Saudi-Arabia',
                code: 'SA',
                flag: 'https://media.api-football.com/flags/sa.svg'
            },
            {
                country: 'Scotland',
                code: 'GB',
                flag: 'https://media.api-football.com/flags/gb.svg'
            },
            {
                country: 'Senegal',
                code: 'SN',
                flag: 'https://media.api-football.com/flags/sn.svg'
            },
            {
                country: 'Serbia',
                code: 'RS',
                flag: 'https://media.api-football.com/flags/rs.svg'
            },
            {
                country: 'Singapore',
                code: 'SG',
                flag: 'https://media.api-football.com/flags/sg.svg'
            },
            {
                country: 'Slovakia',
                code: 'SK',
                flag: 'https://media.api-football.com/flags/sk.svg'
            },
            {
                country: 'Slovenia',
                code: 'SI',
                flag: 'https://media.api-football.com/flags/si.svg'
            },
            {
                country: 'South-Africa',
                code: 'ZA',
                flag: 'https://media.api-football.com/flags/za.svg'
            },
            {
                country: 'South-Korea',
                code: 'KR',
                flag: 'https://media.api-football.com/flags/kr.svg'
            },
            {
                country: 'Spain',
                code: 'ES',
                flag: 'https://media.api-football.com/flags/es.svg'
            },
            {
                country: 'Sudan',
                code: 'SD',
                flag: 'https://media.api-football.com/flags/sd.svg'
            },
            {
                country: 'Sweden',
                code: 'SE',
                flag: 'https://media.api-football.com/flags/se.svg'
            },
            {
                country: 'Switzerland',
                code: 'CH',
                flag: 'https://media.api-football.com/flags/ch.svg'
            },
            {
                country: 'Thailand',
                code: 'TH',
                flag: 'https://media.api-football.com/flags/th.svg'
            },
            {
                country: 'Tunisia',
                code: 'TN',
                flag: 'https://media.api-football.com/flags/tn.svg'
            },
            {
                country: 'Turkey',
                code: 'TR',
                flag: 'https://media.api-football.com/flags/tr.svg'
            },
            {
                country: 'Ukraine',
                code: 'UA',
                flag: 'https://media.api-football.com/flags/ua.svg'
            },
            {
                country: 'United-Arab-Emirates',
                code: 'AE',
                flag: 'https://media.api-football.com/flags/ae.svg'
            },
            {
                country: 'Uruguay',
                code: 'UY',
                flag: 'https://media.api-football.com/flags/uy.svg'
            },
            {
                country: 'USA',
                code: 'US',
                flag: 'https://media.api-football.com/flags/us.svg'
            },
            {
                country: 'Uzbekistan',
                code: 'UZ',
                flag: 'https://media.api-football.com/flags/uz.svg'
            },
            {
                country: 'Venezuela',
                code: 'VE',
                flag: 'https://media.api-football.com/flags/ve.svg'
            },
            {
                country: 'Vietnam',
                code: 'VN',
                flag: 'https://media.api-football.com/flags/vn.svg'
            },
            {
                country: 'Wales',
                code: 'GB',
                flag: 'https://media.api-football.com/flags/gb.svg'
            },
            {
                country: 'World',
                code: null,
                flag: null
            },
            {
                country: 'Zambia',
                code: 'ZM',
                flag: 'https://media.api-football.com/flags/zm.svg'
            },
            {
                country: 'Zimbabwe',
                code: 'ZW',
                flag: 'https://media.api-football.com/flags/zw.svg'
            }
        ]
    }
};
