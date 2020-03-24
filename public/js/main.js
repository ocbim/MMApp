const typeInstalation = $("select[name='typeInstalation']");
const meter = $("select[name='meter']");
const puntos = $("input[name='point']");


var punto1 = 0.0;
var punto2 = 0.0;
var datos = '';
/**
 * Puntos de las instalaciones
 */
const instalacionesMM = {
    'MM_NUEVA_INTERIOR': 2.2,
    'MM_NUEVA_EXTERIOR': 2.3,
    'MM_REUTILIZADA': 1.4,
    'MM_AVERIA': 0.85,
    'MM_AVERIA_FESTIVO': 0.95,
    'MM_NEBA': 1.2,
    'MM_NEBA_AUTOINST_INT': 2.2,
    'MM_NEBA_AUTOINST_EXT': 2.3
}

$(document).ready(() => {
    /**
 * Verifica la opcion elegida y la compara para dar los puntos de la instalacion
 * y lo agrega en el campo puntos
 */
    const contarPuntosTypeInstall = () => {
        if (typeInstalation.val() in instalacionesMM) {
            punto1 = instalacionesMM[`${typeInstalation.val()}`];
            puntos.val(punto1);
        }
    };
    const contarMetros = () => {
        if (meter.val() >= 80) {
            punto2 = 0.3;
            puntos.val(parseFloat(punto1 + punto2).toFixed(1));
        } else if (meter.val() < 80) {
            punto2 = 0.0;
            puntos.val(parseFloat(punto1 + punto2).toFixed(1));
        }
    };

    const ocultar = () => {
        if (typeInstalation.val() == "MM_REUTILIZADA" || typeInstalation.val() == "MM_AVERIA" || typeInstalation.val() == 'MM_AVERIA_FESTIVO' || typeInstalation.val() == 'MM_NEBA') {
            meter.hide();
        } else {
            meter.show();
        }
    };

    /**
     * Se ejecuta si hay un evento de cambio en la opcion de tipos de instalaciones.
     */
    typeInstalation.change(() => {
        ocultar();
        contarPuntosTypeInstall();
    });

    meter.change(() => {
        contarMetros()
    });


    ocultar();
    contarPuntosTypeInstall();
    contarMetros();

    // $.get('/api/edit/5e7821d7eea15f7936a91274', (data) => {
    //     datos = data;
    //     for (var key in data) {
    //         if (key == 'dateInstalation') {
    //             $(`[name='${key}']`).val(data[key].split('T')[0]);

    //         } else {
    //             $(`[name='${key}']`).val(data[key]);
    //         };
    //     };
    // });

    // email.change(() => {
    //     if (re.exec(email.val())) {
    //         email.removeClass('is-invalid');
    //         email.addClass('is-valid');
    //     } else {
    //         email.removeClass('is-valid');
    //         email.addClass('is-invalid');
    //     }
    // });
    // password.change(() => {
    //     if (reP.exec(password.val())) {
    //         password.removeClass('is-invalid');
    //         password.addClass('is-valid');
    //     } else {
    //         password.removeClass('is-valid');
    //         password.addClass('is-invalid');
    //     }
    // });

});