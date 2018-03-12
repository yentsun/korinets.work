$(function(){
    $('a.reference.external').each(function(){
        var cur = $(this);
        if (cur.attr('href').indexOf('stackoverflow.com') > 0) {
            cur.before('<i class="fa fa-stack-overflow"></i>&nbsp;');
        }
        else if (cur.attr('href').indexOf('github.com') > 0) {
            cur.before('<i class="fa fa-github"></i>&nbsp;');
        }
        else if (cur.attr('href').indexOf('plus.google.com') > 0) {
            cur.before('<i class="fa fa-google-plus"></i>&nbsp;');
        }
        else if (cur.attr('href').indexOf('last.fm') > 0) {
            cur.before('<i class="fa fa-lastfm"></i>&nbsp;');
        }
        else if (cur.attr('href').indexOf('@') > 0) {
            cur.before('<i class="fa fa-envelope-o"></i>&nbsp;');
        }
        else if (cur.attr('href').indexOf('bitbucket.org') > 0) {
            cur.before('<i class="fa fa-bitbucket"></i>&nbsp;');
        }
        else if (cur.attr('href').indexOf('readthedocs.org') > 0) {
            cur.before('<i class="fa fa-book"></i>&nbsp;');
        }
        else {
             cur.before('<i class="fa fa-external-link"></i>&nbsp;');
        }
    });
});