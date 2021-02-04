function b = fm_demod(signal)

    signal_delayed = [0;signal(1:length(signal)-1)];
    
    b = angle((signal).*conj(signal_delayed));
    
end