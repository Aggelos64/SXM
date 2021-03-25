$(document).ready(function () {
    $('.addTitle').each(function(i){
        if (this.src.indexOf('0.') != -1){ //This can be changed from 0. to 0 in production
            $(this).prop('title', 'Δεν έχουν συμπληρωθεί όλα τα υποχρεωτικά πεδία');
        } else if (this.src.indexOf('1') != -1){
            $(this).prop('title', 'Δεν έχουν συμπληρωθεί κάποια μη υποχρεωτικά πεδία');
        }
    })
});
