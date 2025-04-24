import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function rutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const rutCompleto:string=control.value;
        if(rutCompleto===null || rutCompleto === undefined || rutCompleto===""){
            return {rutInvalido:{required:true,format:false,dv:false}};
        }


        if(!/^[0-9]{7,8}-[0-9kK]{1}$/.test(rutCompleto)){
            return {rutInvalido:{required:false,format:true,dv:false}};
        }
        var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1].toLocaleLowerCase(); 
		var rut 	= tmp[0];

        return (dv(rut)!=digv) ? {rutInvalido:{required:false,format:false,dv:true}} : null;
    };
}
    
function dv(T:any){
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
}