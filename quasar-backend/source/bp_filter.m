
function c = bp_filter(signal, fcutofflow, fcutoffhigh, fsample)

    BPtaps = fir1(100,[fcutofflow fcutoffhigh]./fsample,'bandpass');
    
    c = filter(BPtaps,1,signal);

end
