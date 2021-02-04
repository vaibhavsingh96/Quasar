function a = fm_filter(signal, fcenter, fcutoff, ftransitionbw, fsample)

    x1 = fftshift(fft(signal));
    x2 = circshift(x1,-1*floor(fcenter*length(x1)/fsample));
    x3 = ifft(fftshift(x2));
    
    firtaps = firgr('minorder',[0,(fcutoff-ftransitionbw)/(fsample/2),fcutoff/(fsample/2),1],[1 1 0 0],[0.00057565 1e-4]);
    lowpassFIR = dsp.FIRFilter('Numerator',firtaps);
    a = lowpassFIR(x3);

end


