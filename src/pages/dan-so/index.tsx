import DanSoLayout from '@/layouts/DanSoLayout'
import { getSeoByLink } from '@/services/api'
import styles from '@/styles/pages/Danso/index.module.scss'
import Head from 'next/head'
import React, { useState } from 'react'
import parse from 'html-react-parser'

const Danso = ({ tags }: { tags: any }) => {
    const copyFunction = (value: string) => {
        navigator.clipboard.writeText(value)
    }
    const [dannhanh, setDanNhanh] = useState('')
    const [countXien, setCountXien] = useState('2')
    const [numberXien, setNumberXien] = useState('')
    const [loxienRow, setLoxienRow] = useState('')
    const [loxienTh, setLoXienTh] = useState('')
    const [mucsoInput, setMucsoInput] = useState('')
    const [mucsoOutput, setMucsoOutput] = useState('')
    const [dau, setDau] = useState('')
    const [duoi, setDuoi] = useState('')
    const [tongF2, setTongF2] = useState('')
    const [themF2, setThemF2] = useState('')
    const [boF2, setBoF2] = useState('')
    const [resultF2, setResultF2] = useState('')
    const [cham, setCham] = useState('')
    const [tong, setTong] = useState('')
    const [themF1, setThemF1] = useState('')
    const [boF1, setBoF1] = useState('')
    const [resultF1, setResultF1] = useState('')
    const [bo, setBo] = useState('')
    const [tongF3, setTongF3] = useState('')
    const [themF3, setThemF3] = useState('')
    const [boF3, setBoF3] = useState('')
    const [resultF3, setResultF3] = useState('')
    const [dan1, setDan1] = useState('')
    const [dan2, setDan2] = useState('')
    const [resultDanDacbiet, setResultDanDacbiet] = useState('')
    const [cang, setCang] = useState('')
    const [danso2d3d, setDanSo2d3d] = useState('')
    const [them2d3d, setThem2d3d] = useState('')
    const [bo2d3d, setBo2d3d] = useState('')
    const [result3d, setResult3d] = useState('')

    const renew3d = () => {
        setCang('')
        setDanSo2d3d('')
        setThem2d3d('')
        setBo2d3d('')
        setResult3d('')
    }

    const renewF3 = () => {
        setBo('')
        setTongF3('')
        setThemF3('')
        setBoF3('')
        setResultF3('')
    }

    const renewF2 = () => {
        setDau('')
        setDuoi('')
        setTongF2('')
        setThemF2('')
        setBoF2('')
        setResultF2('')
    }

    const renewF1 = () => {
        setCham('')
        setTong('')
        setThemF1('')
        setBoF1('')
        setResultF1('')
    }

    function TaoDan3D() {
        var arraydau = myTrim(cang).split(',')
        var arrayduoi = myTrim(danso2d3d).split(',')
        var arraytong = myTrim('').split(',')

        var dan = ''
        var layso = ''

        if (
            arrayduoi.length > 0 &&
            myTrim(cang) != '' &&
            arraydau.length > 0 &&
            myTrim(danso2d3d) != ''
        ) {
            /*Dau vs duoi
            for (var i = 0; i < arraydau.length; i++) {
                if (arraydau[i].toString() != '') {
                    for (var j = 0; j < arrayduoi.length; j++) {
                        if (arrayduoi[i].toString() != '') {
                            dan += arraydau[i].toString() + arrayduoi[j].toString() + ',';
                        }
                    }
                }
            }*/
            /*Dau vs duoi*/
            for (var i = 0; i < arraydau.length; i++) {
                if (arraydau[i] != '') {
                    for (var j = 0; j < arrayduoi.length; j++) {
                        if (arrayduoi[i] != '') {
                            dan += arraydau[i] + arrayduoi[j] + ','
                        }
                    }
                }
            }
        } else if (
            arrayduoi.length > 0 &&
            myTrim(cang) == '' &&
            myTrim(danso2d3d) != ''
        ) {
            /*Duoi*/
            arraydau = cang.split(',')
            for (var i = 0; i < arraydau.length; i++) {
                if (arraydau[i].toString() != '') {
                    for (var j = 0; j <= 9; j++) {
                        dan += j.toString() + arraydau[i].toString() + ','
                    }
                }
            }
        } else if (
            myTrim(cang) != '' &&
            myTrim(danso2d3d) == '' &&
            arraydau.length > 0
        ) {
            /*Dau*/
            arraydau = cang.split(',')
            if (arraydau.length > 0) {
                for (var i = 0; i < arraydau.length; i++) {
                    if (arraydau[i].toString() != '') {
                        for (var j = 0; j <= 9; j++) {
                            dan += arraydau[i].toString() + j.toString() + ','
                        }
                    }
                }
            }
        } else if (
            myTrim(cang) == '' &&
            myTrim(danso2d3d) == '' &&
            myTrim(cang) != '' &&
            arraytong.length > 0
        ) {
            /*Tong*/
            var tong = 0
            var ss = ''
            for (var k = 0; k < arraytong.length; k++) {
                if (myTrim(arraytong[k].toString()) != '') {
                    for (var i = 0; i <= 9; i++) {
                        for (var j = 0; j <= 9; j++) {
                            tong = i + j
                            ss = tong.toString()
                            ss = ss.length == 2 ? ss.substring(1) : ss
                            if (ss == arraytong[k].toString()) {
                                dan += i.toString() + j.toString() + ','
                            }
                        }
                    }
                }
            }
        }

        /*Tong*/
        arraydau = dan.split(',')

        if (arraytong[0].toString() != '') {
            dan = ''
            var so = ''
            var a = 0
            for (var i = 0; i < arraytong.length; i++) {
                if (arraytong[i].toString() != '') {
                    for (var j = 0; j < arraydau.length; j++) {
                        if (arraydau[j].toString() != '') {
                            a =
                                parseInt(arraydau[j].substring(0, 1)) +
                                parseInt(arraydau[j].substring(1))
                            so = a.toString()
                            so = so.length == 2 ? so.substring(1) : so
                            if (so == arraytong[i].toString()) {
                                dan += arraydau[j].toString() + ','
                            }
                        }
                    }
                }
            }
        }

        dan = BoTrung(dan)

        dan += them2d3d
        arraydau = bo2d3d.split(',')
        for (var i = 0; i < arraydau.length; i++) {
            if (arraydau[i].toString() != '') {
                layso = arraydau[i].toString() + ','
                dan = dan.replace(layso, '')
            }
        }

        setResult3d(BoPhay(BoTrung(dan)))
        return false
    }

    function myTrim(x: string) {
        return x.replace(/^\s+|\s+$/gm, '')
    }
    function isNumeric(value: any) {
        if (parseFloat(value) == parseInt(value) && !isNaN(value)) {
            return true
        } else {
            return false
        }
    }

    function BoTrung(valueloc: string) {
        var arrayValue = valueloc.split(',')
        var danloc = ''
        for (var i = 0; i < arrayValue.length; i++) {
            if (arrayValue[i].toString() != '') {
                if (danloc.indexOf(arrayValue[i].toString()) == -1) {
                    danloc += arrayValue[i].toString() + ','
                }
            }
        }
        return danloc
    }
    function TaoDanBong() {
        var arrayBong = myTrim(bo).split(',')
        var arrayTong = myTrim(tong).split(',')

        var dan = ''

        for (var i = 0; i < arrayBong.length; i++) {
            if (myTrim(arrayBong[i].toString()) != '') {
                for (var j = 0; j <= 9; j++) {
                    dan += BOSO(arrayBong[i].toString())
                }
            }
        }

        dan = BoTrung(dan)
        var arraydau = dan.split(',')

        if (tong.length > 0) {
            dan = ''
            var so = ''
            var a = 0
            for (var i = 0; i < tong.length; i++) {
                var tt = tong.charAt(i) + ''
                if (isNumeric(tt)) {
                    for (var j = 0; j < arraydau.length; j++) {
                        if (arraydau[j].toString() != '') {
                            a =
                                parseInt(arraydau[j].substring(0, 1)) +
                                parseInt(arraydau[j].substring(1))
                            so = a.toString()
                            so = so.length == 2 ? so.substring(1) : so
                            if (so == tt) {
                                dan += arraydau[j].toString() + ','
                            }
                        }
                    }
                }
            }
        }

        dan = BoTrung(dan)
        dan += themF3
        arraydau = boF3.split(',')

        var layso = ''

        for (var i = 0; i < arraydau.length; i++) {
            if (arraydau[i].toString() != '') {
                layso = arraydau[i].toString() + ','

                dan = dan.replace(layso, '')
            }
        }
        setResultF3(BoPhay(BoTrung(dan)))
    }
    function BoPhay(dan: string) {
        dan = dan + 'jjjjjjjjjjiiik'
        dan = dan.replace(',jjjjjjjjjjiiik', '')
        dan = dan.replace('jjjjjjjjjjiiik', '')
        return dan
    }

    function countString(str: string, search: string | number) {
        var count = 0
        var index = str.indexOf(search.toString())
        while (index != -1) {
            count++
            index = str.indexOf(search.toString(), index + 1)
        }
        return count
    }

    function LOCLAYTRUNG() {
        var arraydan1 = myTrim(dan1).split(',')

        var dan = ''

        for (var i = 0; i < arraydan1.length; i++) {
            if (myTrim(arraydan1[i].toString()) != '') {
                if (myTrim(dan2).indexOf(arraydan1[i].toString()) >= 0) {
                    dan += arraydan1[i].toString() + ','
                }
            }
        }
        dan = BoTrung(dan)
        setResultDanDacbiet(BoPhay(dan))
    }

    function LOCGHEPDAN() {
        var dan = ''
        dan = dan1 + ',' + dan2
        dan = dan.replace(',,', ',')
        dan = BoTrung(dan)
        setResultDanDacbiet(BoPhay(dan))
    }

    function LOCDAN1DAN2() {
        var arraydan1 = myTrim(dan2).split(',')
        var dan = myTrim(dan1)
        var so = ''
        for (var i = 0; i < arraydan1.length; i++) {
            so = ''
            if (myTrim(arraydan1[i].toString()) != '') {
                so = myTrim(arraydan1[i].toString()) + ','
                if (dan.indexOf(so) >= 0) {
                    dan = dan.replace(so, '')
                }
            }
        }

        dan = BoTrung(dan)
        setResultDanDacbiet(BoPhay(dan))
    }

    function LOCDAN2DAN1() {
        var arraydan1 = myTrim(dan1).split(',')
        var dan = myTrim(dan2)
        var so = ''
        for (var i = 0; i < arraydan1.length; i++) {
            so = ''
            if (myTrim(arraydan1[i].toString()) != '') {
                so = myTrim(arraydan1[i].toString()) + ','
                if (dan.indexOf(so) >= 0) {
                    dan = dan.replace(so, '')
                }
            }
        }
        dan = BoTrung(dan)
        setResultDanDacbiet(BoPhay(dan))
    }

    function TaoDanF2() {
        var dan = ''
        var layso = ''

        if (myTrim(dau) != '' && myTrim(duoi) != '') {
            /*Dau vs duoi*/
            for (var i = 0; i < dau.length; i++) {
                var d = dau.charAt(i) + ''
                if (isNumeric(d)) {
                    for (var j = 0; j < duoi.length; j++) {
                        var e = duoi.charAt(j) + ''
                        if (isNumeric(e)) {
                            dan += d + e + ','
                        }
                    }
                }
            }
        } else if (myTrim(dau) == '' && myTrim(dau) != '') {
            /*Duoi*/
            for (var i = 0; i < duoi.length; i++) {
                var e = duoi.charAt(i) + ''
                if (isNumeric(e)) {
                    for (var j = 0; j <= 9; j++) {
                        dan += j.toString() + e + ','
                    }
                }
            }
        } else if (myTrim(dau) != '' && myTrim(duoi) == '') {
            /*Dau*/
            for (var i = 0; i < dau.length; i++) {
                var d = dau.charAt(i) + ''
                if (isNumeric(d)) {
                    for (var j = 0; j <= 9; j++) {
                        dan += d + j.toString() + ','
                    }
                }
            }
        } else if (
            myTrim(dau) == '' &&
            myTrim(duoi) == '' &&
            myTrim(tongF2) != ''
        ) {
            /*Tong*/
            var tongt = 0
            var ss = ''
            for (var k = 0; k < tongF2.length; k++) {
                var tt = tongF2.charAt(k) + ''
                if (isNumeric(tt)) {
                    for (var i = 0; i <= 9; i++) {
                        for (var j = 0; j <= 9; j++) {
                            tongt = i + j
                            ss = tongt.toString()
                            ss = ss.length == 2 ? ss.substring(1) : ss
                            if (ss == tt) {
                                dan += i.toString() + j.toString() + ','
                            }
                        }
                    }
                }
            }
        }

        /*Tong*/
        var arraydau = dan.split(',')

        if (tongF2.length > 0) {
            dan = ''
            var so = ''
            var a = 0
            for (var i = 0; i < tongF2.length; i++) {
                var tt = tongF2.charAt(i) + ''
                if (isNumeric(tt)) {
                    for (var j = 0; j < arraydau.length; j++) {
                        if (arraydau[j].toString() != '') {
                            a =
                                parseInt(arraydau[j].substring(0, 1)) +
                                parseInt(arraydau[j].substring(1))
                            so = a.toString()
                            so = so.length == 2 ? so.substring(1) : so
                            if (so == tt) {
                                dan += arraydau[j].toString() + ','
                            }
                        }
                    }
                }
            }
        }

        var danloc = BoTrung(dan)
        var dancuoi = danloc + themF2
        arraydau = boF2.split(',')
        for (var i = 0; i < arraydau.length; i++) {
            if (arraydau[i].toString() != '') {
                var so = arraydau[i].toString() + ','
                var sox = /so/g
                dancuoi = dancuoi.replace(so, '')
            }
        }

        setResultF2(BoPhay(BoTrung(dancuoi)))
    }

    function TaoDanChamTong() {
        var arrayCham = myTrim(cham).split(',')
        var arrayTong = myTrim(tong).split(',')
        var dan = ''

        for (var i = 0; i < cham.length; i++) {
            var ccc = cham.charAt(i) + ''
            if (isNumeric(ccc)) {
                for (var j = 0; j <= 9; j++) {
                    dan += j.toString() + ccc + ','
                    dan += ccc + j.toString() + ','
                }
            }
        }

        dan = BoTrung(dan)
        var arraydau = dan.split(',')

        if (tong.length > 0) {
            dan = ''
            var so = ''
            var a = 0
            for (var i = 0; i < tong.length; i++) {
                var tt = tong.charAt(i) + ''
                if (isNumeric(tt)) {
                    for (var j = 0; j < arraydau.length; j++) {
                        if (arraydau[j].toString() != '') {
                            a =
                                parseInt(arraydau[j].substring(0, 1)) +
                                parseInt(arraydau[j].substring(1))
                            so = a.toString()
                            so = so.length == 2 ? so.substring(1) : so
                            if (so == tt) {
                                dan += arraydau[j].toString() + ','
                            }
                        }
                    }
                }
            }
        }

        dan = BoTrung(dan)
        dan += themF1
        arraydau = boF1.split(',')
        var layso = ''
        for (var i = 0; i < arraydau.length; i++) {
            if (arraydau[i].toString() != '') {
                layso = arraydau[i].toString() + ','
                dan = dan.replace(layso, '')
            }
        }
        setResultF1(BoPhay(BoTrung(dan)))
    }

    function TaoMucSo() {
        var eachLine = mucsoInput.split(',')
        var listOfObjects = []
        var list_lo = []
        for (let i = 0; i <= 99; i++) {
            var lo, count
            if (i <= 9) lo = '0' + i
            else lo = i
            count = countString(mucsoInput, lo)
            listOfObjects.push({
                lo: lo,
                count: count,
            })
        }
        listOfObjects.sort(function (a, b) {
            return a.count - b.count
        })
        var value1, value2, check
        value1 = ''
        value2 = ''
        for (var cc = 0; cc <= 1000; cc++) {
            for (let i in listOfObjects) {
                if (listOfObjects[i].count == cc) {
                    check = true
                    value2 += listOfObjects[i].lo + ','
                    list_lo.push(listOfObjects[i].lo)
                }
            }
            list_lo.sort()
            if (check == true) {
                value1 +=
                    'Mức: ' +
                    cc +
                    ' (' +
                    list_lo.length +
                    ') số' +
                    '\n' +
                    list_lo.join(',') +
                    '\n'
                check = false
                value2 = ''
                //$('#MainContent_txtOutput').closest('.socp').find('.thongke').text('Mức: ' + cc + ' (' + list_lo.length + ') số');
                list_lo.length = 0
            }
        }
        setMucsoOutput(value1)
    }

    function get_combinations(input: string[], size: number) {
        var results = [],
            result,
            mask,
            total = Math.pow(2, input.length)
        for (mask = 0; mask < total; mask++) {
            result = []
            let i = input.length - 1
            do {
                if ((mask & (1 << i)) !== 0) {
                    result.push(input[i])
                }
            } while (i--)
            if (result.length >= size) {
                results.push(result)
            }
        }
        return results
    }

    function make_lo_xien() {
        const count = parseInt(countXien)
        if (isNaN(count)) {
            alert('Vui lòng chọn số thành viên để ghép lô xiên')
            return false
        }
        let inputed_number = []
        let inputed_number_in_string = []
        let numbers_string = numberXien
            .replace(/[ ,]+/g, ',')
            .replace(/[^0-9,]/g, '')
        let string_list = numbers_string.split(',')
        for (let i = 0; i < string_list.length; i++) {
            let abc = string_list[i]
            let def = parseInt(abc) % 100
            if (inputed_number.indexOf(def) == -1) {
                inputed_number.push(def)
                let ghi = '0000' + def
                let jkl = ghi.substring(ghi.length - 2)
                inputed_number_in_string.push(jkl)
            }
        }
        if (count > inputed_number.length) {
            alert('Bạn không nhập vào đủ bộ số để tạo lô xiên')
            return false
        }
        let loxien_list = []
        let all_comb = get_combinations(inputed_number_in_string, count)
        var output_delim = '&'
        let col_each_row = 4
        let need_new_row = true
        let new_row = ''
        let counter = 0
        for (let i = 0; i < all_comb.length; i++) {
            let cur_comb = all_comb[i]
            if (cur_comb.length == count) {
                if (need_new_row) {
                    new_row += '<tr>'
                    need_new_row = false
                }
                counter++
                new_row += '<td>' + cur_comb.join(output_delim) + '</td>'

                if (0 == counter % col_each_row) {
                    new_row += '</tr>'
                    need_new_row = true
                }
            }
        }
        if (!need_new_row) {
            let more_cell_count = 4 - (counter % 4)
            for (let i = 0; i < more_cell_count; i++) new_row += '<td></td>'
            new_row += '</tr>'
            need_new_row = true
        }
        new_row +=
            '<tr class="info"><td class="chu17 vietdam dosam" colspan="' +
            col_each_row +
            '"><span class="mauden vietthuong chu15">Tổng số lô xiên tạo được là: </span>' +
            counter +
            '</td></tr>'
        setLoxienRow(new_row)
        return false
    }
    function LayDanNhanh(strValue: string) {
        var dan = ''
        if (strValue == 'dauchan') {
            dan =
                '00,01,02,03,04,05,06,07,08,09,20,21,22,23,24,25,26,27,28,29,40,41,42,43,44,45,46,47,48,49,60,61,62,63,64,65,66,67,68,69,80,81,82,83,84,85,86,87,88,89'
        } else if (strValue == 'daule') {
            dan =
                '10,11,12,13,14,15,16,17,18,19,30,31,32,33,34,35,36,37,38,39,50,51,52,53,54,55,56,57,58,59,70,71,72,73,74,75,76,77,78,79,90,91,92,93,94,95,96,97,98,99'
        } else if (strValue == 'daube') {
            dan =
                '00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49'
        } else if (strValue == 'daulon') {
            dan =
                '50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99'
        } else if (strValue == 'duoichan') {
            dan =
                '00,02,04,06,08,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98'
        } else if (strValue == 'duoile') {
            dan =
                '01,03,05,07,09,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99'
        } else if (strValue == 'duoibe') {
            dan =
                '00,01,02,03,04,10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,40,41,42,43,44,50,51,52,53,54,60,61,62,63,64,70,71,72,73,74,80,81,82,83,84,90,91,92,93,94'
        } else if (strValue == 'duoilon') {
            dan =
                '05,06,07,08,09,15,16,17,18,19,25,26,27,28,29,35,36,37,38,39,45,46,47,48,49,55,56,57,58,59,65,66,67,68,69,75,76,77,78,79,85,86,87,88,89,95,96,97,98,99'
        } else if (strValue == 'tongchan') {
            dan =
                '00,02,04,06,08,11,13,15,17,19,20,22,24,26,28,31,33,35,37,39,40,42,44,46,48,51,53,55,57,59,60,62,64,66,68,71,73,75,77,79,80,82,84,86,88,91,93,95,97,99'
        } else if (strValue == 'tongle') {
            dan =
                '01,03,05,07,09,10,12,14,16,18,21,23,25,27,29,30,32,34,36,38,41,43,45,47,49,50,52,54,56,58,61,63,65,67,69,70,72,74,76,78,81,83,85,87,89,90,92,94,96,98'
        } else if (strValue == 'tongbe') {
            dan =
                '00,01,02,03,04,10,11,12,13,19,20,21,22,28,29,30,31,37,38,39,40,46,47,48,49,55,56,57,58,59,64,65,66,67,68,73,74,75,76,77,82,83,84,85,86,91,92,93,94,95'
        } else if (strValue == 'tonglon') {
            dan =
                '05,06,07,08,09,14,15,16,17,18,23,24,25,26,27,32,33,34,35,36,41,42,43,44,45,50,51,52,53,54,60,61,62,63,69,70,71,72,78,79,80,81,87,88,89,90,96,97,98,99'
        } else if (strValue == 'chanchan') {
            dan =
                '00,22,44,66,88,02,20,04,40,06,60,08,80,24,42,26,62,28,82,46,64,48,84,68,86'
        } else if (strValue == 'chanle') {
            dan =
                '01,03,05,07,09,21,23,25,27,29,41,43,45,47,49,61,63,65,67,69,81,83,85,87,89'
        } else if (strValue == 'lechan') {
            dan =
                '10,12,14,16,18,30,32,34,36,38,50,52,54,56,58,70,72,74,76,78,90,92,94,96,98'
        } else if (strValue == 'lele') {
            dan =
                '11,33,55,77,99,13,31,15,51,17,71,19,91,35,53,37,73,39,93,57,75,59,95,79,97'
        } else if (strValue == 'bebe') {
            dan =
                '00,11,22,33,44,01,10,02,20,03,30,04,40,12,21,13,31,14,41,23,32,24,42,34,43'
        } else if (strValue == 'belon') {
            dan =
                '05,06,07,08,09,15,16,17,18,19,25,26,27,28,29,35,36,37,38,39,45,46,47,48,49'
        } else if (strValue == 'lonbe') {
            dan =
                '90,91,92,93,94,80,81,82,83,84,70,71,72,73,74,60,61,62,63,64,50,51,52,53,54'
        } else if (strValue == 'lonlon') {
            dan =
                '55,66,77,88,99,56,65,57,75,58,85,59,95,67,76,68,86,69,96,78,87,79,97,89,98'
        } else if (strValue == 'kepbang') {
            dan = '00,55,11,66,22,77,33,88,44,99'
        } else if (strValue == 'keplech') {
            dan = '05,50,16,61,27,72,38,83,49,94'
        } else if (strValue == 'kepam') {
            dan = '07,70,14,41,29,92,36,63,58,85'
        } else if (strValue == 'satkep') {
            dan = '01,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98'
        }
        setDanNhanh(dan)
    }
    function BOSO(so: string) {
        var dau = so.substring(0, 1)
        var duoi = so.substring(1)

        var bongdau: string = BONGSO(dau)
        var bongduoi: string = BONGSO(duoi)
        var dan = ''

        dan += dau + duoi + ','
        dan += duoi + dau + ','

        dan += dau + bongduoi + ','
        dan += bongduoi + dau + ','

        dan += bongdau + duoi + ','
        dan += duoi + bongdau + ','

        dan += bongdau + bongduoi + ','
        dan += bongduoi + bongdau + ','

        return dan
    }

    function BONGSO(so: string) {
        switch (so) {
            case '0':
                return '5'
            case '5':
                return '0'
            case '1':
                return '6'
            case '6':
                return '1'
            case '2':
                return '7'
            case '7':
                return '2'
            case '3':
                return '8'
            case '8':
                return '3'
            case '4':
                return '9'
            case '9':
                return '4'
            default:
                return ''
        }
    }
    return (
        <>
            <Head>
                <link rel="canonical" href={`https://xosoaladin.com/dan-so`} />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.danso}>
                <div>
                    <h2 className={styles.dansoTitle}>Tạo Dàn Đặc Biệt</h2>
                    <div className={styles.danDacBiet}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Chạm</td>
                                    <td>+</td>
                                    <td>Tổng</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setCham(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                    <td>+</td>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setTong(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thêm</td>
                                    <td colSpan={2}>
                                        <input
                                            onChange={(e) =>
                                                setThemF1(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bỏ</td>
                                    <td colSpan={2}>
                                        <input
                                            onChange={(e) =>
                                                setBoF1(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.dandacbietValue}>
                            <div className={styles.danDacBietValueWrapper}>
                                <div className={styles.dandacbietButton}>
                                    <button
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => TaoDanChamTong()}
                                    >
                                        Tạo dàn
                                    </button>
                                    <button
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => renewF1()}
                                    >
                                        Làm lại
                                    </button>
                                    <p>Kết qủa</p>
                                </div>
                                <div className={styles.dandacbietCoppy}>
                                    <button
                                        onClick={() => copyFunction(resultF1)}
                                        className={styles.buttonCopy}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                            <div className={styles.dandavbietTextArea}>
                                <textarea
                                    value={resultF1}
                                    style={{
                                        height: '100px',
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.danDacBiet}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Đầu</td>
                                    <td>+</td>
                                    <td>Đuôi</td>
                                    <td>+</td>
                                    <td>Tổng</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setDau(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                    <td>+</td>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setDuoi(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                    <td>+</td>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setTongF2(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thêm</td>
                                    <td colSpan={4}>
                                        <input
                                            onChange={(e) =>
                                                setThemF2(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bỏ</td>
                                    <td colSpan={4}>
                                        <input
                                            onChange={(e) =>
                                                setBoF2(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.dandacbietValue}>
                            <div className={styles.danDacBietValueWrapper}>
                                <div className={styles.dandacbietButton}>
                                    <button
                                        onClick={() => TaoDanF2()}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Tạo dàn
                                    </button>
                                    <button
                                        onClick={() => renewF2()}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Làm lại
                                    </button>
                                    <p>Kết qủa</p>
                                </div>
                                <div className={styles.dandacbietCoppy}>
                                    <button
                                        onClick={() => copyFunction(resultF2)}
                                        className={styles.buttonCopy}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                            <div className={styles.dandavbietTextArea}>
                                <textarea
                                    value={resultF2}
                                    style={{
                                        height: '100px',
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.danDacBiet}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Bộ</td>
                                    <td>+</td>
                                    <td>Tổng</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setBo(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                    <td>+</td>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setTongF3(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thêm</td>
                                    <td colSpan={2}>
                                        <input
                                            onChange={(e) =>
                                                setThemF3(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bỏ</td>
                                    <td colSpan={2}>
                                        <input
                                            onChange={(e) =>
                                                setBoF3(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.dandacbietValue}>
                            <div className={styles.danDacBietValueWrapper}>
                                <div className={styles.dandacbietButton}>
                                    <button
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => TaoDanBong()}
                                    >
                                        Tạo dàn
                                    </button>
                                    <button
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => renewF3()}
                                    >
                                        Làm lại
                                    </button>
                                    <p>Kết qủa</p>
                                </div>
                                <div className={styles.dandacbietCoppy}>
                                    <button
                                        onClick={() => copyFunction(resultF3)}
                                        className={styles.buttonCopy}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                            <div className={styles.dandavbietTextArea}>
                                <textarea
                                    value={resultF3}
                                    style={{
                                        height: '100px',
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={styles.dansoTitle}>
                        Tạo dàn xổ số | Dàn đề | Dàn 3 càng | Tạo dàn xiên
                    </h2>
                    <div
                        style={{
                            display: 'flex',
                            columnGap: '30px',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            rowGap: '30px',
                            justifyContent: 'center',
                        }}
                    >
                        <textarea
                            value={mucsoInput}
                            onChange={(e) => setMucsoInput(e.target.value)}
                            style={{
                                width: 'calc(50% - 50px)',
                                height: '279px',
                                padding: '10px',
                                fontSize: '17px',
                                outline: 'none',
                                resize: 'none',
                            }}
                        />
                        <textarea
                            value={mucsoOutput}
                            style={{
                                width: 'calc(50% - 50px)',
                                height: '279px',
                                padding: '10px',
                                fontSize: '17px',
                                cursor: 'not-allowed',
                                outline: 'none',
                                resize: 'none',
                            }}
                            disabled
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginTop: '15px',
                        }}
                    >
                        <button
                            style={{ cursor: 'pointer' }}
                            onClick={() => TaoMucSo()}
                            className={styles.buttonTaoMucSo}
                        >
                            Tạo mức số
                        </button>
                        <button
                            onClick={() => copyFunction(mucsoOutput)}
                            className={styles.buttonCopy}
                        >
                            Copy
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className={styles.dansoTitle}>
                        Lấy Nhanh Dàn Đặc Biệt
                    </h2>
                    <div className={styles.dansoNhanhOption}>
                        <button
                            style={{ backgroundColor: '#66FFFF' }}
                            onClick={() => LayDanNhanh('dauchan')}
                        >
                            Đầu Chẵn
                        </button>
                        <button
                            style={{ backgroundColor: '#66FFFF' }}
                            onClick={() => LayDanNhanh('daule')}
                        >
                            Đầu Lẻ
                        </button>
                        <button
                            style={{ backgroundColor: '#66FFFF' }}
                            onClick={() => LayDanNhanh('daube')}
                        >
                            Đầu Bé
                        </button>
                        <button
                            style={{ backgroundColor: '#66FFFF' }}
                            onClick={() => LayDanNhanh('daulon')}
                        >
                            Đầu Lớn
                        </button>
                        <button
                            style={{ backgroundColor: '#FFFF99' }}
                            onClick={() => LayDanNhanh('duoichan')}
                        >
                            Đuôi Chẵn
                        </button>
                        <button
                            style={{ backgroundColor: '#FFFF99' }}
                            onClick={() => LayDanNhanh('duoile')}
                        >
                            Đuôi Lẻ
                        </button>
                        <button
                            style={{ backgroundColor: '#FFFF99' }}
                            onClick={() => LayDanNhanh('duoibe')}
                        >
                            Đuôi Bé
                        </button>
                        <button
                            style={{ backgroundColor: '#FFFF99' }}
                            onClick={() => LayDanNhanh('duoilon')}
                        >
                            Đuôi Lớn
                        </button>
                        <button
                            style={{ backgroundColor: '#FF99FF' }}
                            onClick={() => LayDanNhanh('tongchan')}
                        >
                            Tổng Chẵn
                        </button>
                        <button
                            style={{ backgroundColor: '#FF99FF' }}
                            onClick={() => LayDanNhanh('tongle')}
                        >
                            Tổng Lẻ
                        </button>
                        <button
                            style={{ backgroundColor: '#FF99FF' }}
                            onClick={() => LayDanNhanh('tongbe')}
                        >
                            Tổng Bé
                        </button>
                        <button
                            style={{ backgroundColor: '#FF99FF' }}
                            onClick={() => LayDanNhanh('tonglon')}
                        >
                            Tổng Lớn
                        </button>
                        <button
                            style={{ backgroundColor: '#FF9999' }}
                            onClick={() => LayDanNhanh('chanchan')}
                        >
                            Chắn Chẵn
                        </button>
                        <button
                            style={{ backgroundColor: '#FF9999' }}
                            onClick={() => LayDanNhanh('chanle')}
                        >
                            Chẵn Lẻ
                        </button>
                        <button
                            style={{ backgroundColor: '#FF9999' }}
                            onClick={() => LayDanNhanh('lechan')}
                        >
                            Lẻ Chẵn
                        </button>
                        <button
                            style={{ backgroundColor: '#FF9999' }}
                            onClick={() => LayDanNhanh('lele')}
                        >
                            Lẻ Lẻ
                        </button>
                        <button
                            style={{ backgroundColor: '#66CCFF' }}
                            onClick={() => LayDanNhanh('bebe')}
                        >
                            Bé Bé
                        </button>
                        <button
                            style={{ backgroundColor: '#66CCFF' }}
                            onClick={() => LayDanNhanh('belon')}
                        >
                            Bé Lớn
                        </button>
                        <button
                            style={{ backgroundColor: '#66CCFF' }}
                            onClick={() => LayDanNhanh('lonbe')}
                        >
                            Lớn Bé
                        </button>
                        <button
                            style={{ backgroundColor: '#66CCFF' }}
                            onClick={() => LayDanNhanh('lonlon')}
                        >
                            Lớn Lớn
                        </button>
                        <button
                            style={{ backgroundColor: '#99FF66' }}
                            onClick={() => LayDanNhanh('kepbang')}
                        >
                            Kép Bằng
                        </button>
                        <button
                            style={{ backgroundColor: '#99FF66' }}
                            onClick={() => LayDanNhanh('keplech')}
                        >
                            Kép Lệch
                        </button>
                        <button
                            style={{ backgroundColor: '#99FF66' }}
                            onClick={() => LayDanNhanh('kepam')}
                        >
                            Kép Âm
                        </button>
                        <button
                            style={{ backgroundColor: '#99FF66' }}
                            onClick={() => LayDanNhanh('satkep')}
                        >
                            Sát Kép
                        </button>
                    </div>
                    <div className={styles.dannhanhValue}>
                        <textarea value={dannhanh} />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                            }}
                        >
                            <button
                                onClick={() => copyFunction(dannhanh)}
                                className={styles.buttonCopy}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.locdandacbiet}>
                    <h2 className={styles.dansoTitle}>Lọc ghép dàn đặc biệt</h2>
                    <div className={styles.locdandacbietinput}>
                        <div className={styles.dan1}>
                            <div className={styles.dan1Title}>
                                <p>Dàn 1</p>
                            </div>
                            <div>
                                <textarea
                                    onChange={(e) => setDan1(e.target.value)}
                                    style={{
                                        height: '100px',
                                        width: '100%',
                                        marginTop: '15px',
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.dan2}>
                            <div className={styles.dan2Title}>
                                <p>Dàn 2</p>
                                <button
                                    onClick={() =>
                                        copyFunction(resultDanDacbiet)
                                    }
                                    className={styles.buttonCopy}
                                >
                                    Copy
                                </button>
                            </div>
                            <div>
                                <textarea
                                    onChange={(e) => setDan2(e.target.value)}
                                    style={{
                                        height: '100px',
                                        width: '100%',
                                        marginTop: '5px',
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.locdandacbietResult}>
                            <div className={styles.locdandacbietResultTitle}>
                                <button
                                    onClick={() => LOCLAYTRUNG()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Lấy trùng
                                </button>
                                <button
                                    onClick={() => LOCGHEPDAN()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Ghép dàn
                                </button>
                                <button
                                    onClick={() => LOCDAN1DAN2()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Dàn 1 loại dàn 2
                                </button>
                                <button
                                    onClick={() => LOCDAN2DAN1()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Dàn 2 loại dàn 1
                                </button>
                            </div>
                            <div>
                                <textarea
                                    value={resultDanDacbiet}
                                    style={{ height: '100px', width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className={styles.dansoTitle}>
                        Lọc - Ghép dàn 4D - 3D
                    </h3>
                    <div className={styles.danDacBiet}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Càng</td>
                                    <td>+</td>
                                    <td>Dàn số 2D - 3D</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setCang(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                    <td>+</td>
                                    <td>
                                        <input
                                            onChange={(e) =>
                                                setDanSo2d3d(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thêm</td>
                                    <td colSpan={2}>
                                        <input
                                            onChange={(e) =>
                                                setThem2d3d(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bỏ</td>
                                    <td colSpan={2}>
                                        <input
                                            onChange={(e) =>
                                                setBo2d3d(e.target.value)
                                            }
                                            type={'text'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.dandacbietValue}>
                            <div className={styles.danDacBietValueWrapper}>
                                <div className={styles.dandacbietButton}>
                                    <button
                                        onClick={() => TaoDan3D()}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Tạo dàn
                                    </button>
                                    <button
                                        onClick={() => renew3d()}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Làm lại
                                    </button>
                                    <p>Kết qủa</p>
                                </div>
                                <div className={styles.dandacbietCoppy}>
                                    <button
                                        onClick={() => copyFunction(result3d)}
                                        className={styles.buttonCopy}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                            <div className={styles.dandavbietTextArea}>
                                <textarea
                                    value={result3d}
                                    style={{
                                        height: '100px',
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.loxienTuDong}>
                    <h3 className={styles.dansoTitle}>Ghép lô xiên tự động</h3>
                    <div className={styles.loxienInput}>
                        <p style={{ marginTop: '10px', marginBottom: '5px' }}>
                            Cách ghép - Chọn vào ô phía dưới loại hình lô xiên
                            cần ghép
                        </p>
                        <select
                            value={countXien}
                            onChange={(e) => setCountXien(e.target.value)}
                            style={{
                                width: '100%',
                                height: '35px',
                                fontSize: '16px',
                            }}
                        >
                            <option value="2">Ghép lô xiên 2</option>
                            <option value="3">Ghép lô xiên 3</option>
                            <option value="4">Ghép lô xiên 4</option>
                        </select>
                        <p style={{ marginTop: '10px', marginBottom: '5px' }}>
                            Bộ số - Ví dụ ghép lô xiên 2 của các lô 18,23,99
                        </p>
                        <input
                            onChange={(e) => setNumberXien(e.target.value)}
                            type={'text'}
                            style={{ width: '100%', height: '30px' }}
                        />
                        <p
                            style={{
                                cursor: 'pointer',
                                marginTop: '10px',
                                marginBottom: '5px',
                            }}
                            onClick={() => make_lo_xien()}
                        >
                            Xem kết qủa
                        </p>
                    </div>
                </div>
                <div className={styles.loxienResult}>
                    {loxienRow && (
                        <table className={styles.tableLoxien}>
                            <thead>
                                <tr>
                                    <th colSpan={4}>Lô xiên</th>
                                </tr>
                            </thead>
                            <tbody
                                dangerouslySetInnerHTML={{ __html: loxienRow }}
                            ></tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}
//@ts-ignore
Danso.getLayout = (page) => {
    return <DanSoLayout>{page}</DanSoLayout>
}

export default Danso

export async function getServerSideProps() {
    const params: any = {
        link: '/dien-toan/dan-so',
    }

    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
