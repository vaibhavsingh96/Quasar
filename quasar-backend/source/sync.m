function sync_sat_signal = sync(ref_sat_signal,ref_sop_signal,sat_signal,sop_signal,preamble_sat_signal,preamble_sop_signal,sampling_rate,sop_signal_packet_length)
    
    sop_signal_packet_length = sop_signal_packet_length*sampling_rate;
    
    [ref_sop_signal_corr_val,ref_sop_signal_corr_idx] = xcorr(ref_sop_signal,preamble_sop_signal);
    [~,ref_sop_signal_preamble_locs] = findpeaks(abs(ref_sop_signal_corr_val((length(ref_sop_signal_corr_val)+1)/2:end)),'MinPeakDistance',sop_signal_packet_length);
    
    [sop_signal_corr_val,sop_signal_corr_idx] = xcorr(sop_signal,preamble_sop_signal);
    [~,sop_signal_preamble_locs] = findpeaks(abs(sop_signal_corr_val((length(sop_signal_corr_val)+1)/2:end)),'MinPeakDistance',sop_signal_packet_length);
    
    ref_sop_signal_corr_val = ref_sop_signal_corr_val((length(ref_sop_sginal_corr_val)+1)/2 + ref_sop_signal_preamble_locs(1) -1:end);
    sop_signal_corr_val = sop_signal_corr_val((length(sop_sginal_corr_val)+1)/2 + sop_signal_preamble_locs(1) - 1:end);
    
    ref_sop_signal_corr_val = ref_sop_signal_corr_val(1:end - mod(length(ref_sop_signal_corr_val),sop_signal_packet_length));
    sop_signal_corr_val = sop_signal_corr_val(1:end - mod(length(sop_signal_corr_val),sop_signal_packet_length));

    
    if length(ref_sop_signal_corr_val)/sop_signal_packet_length > length(sop_signal_corr_val)/sop_signal_packet_length
        sop_signal_corr_val = [sop_signal_corr_val;zeros(length(ref_sop_signal_corr_val)-length(sop_signal_corr_val),1)];
    else
        sop_signal_corr_val = sop_signal_corr_val(1:length(ref_sop_signal_corr_val));
    end
    
    phase_diff_sop_signal = angle(sop_signal_corr_val(1:sop_signal_packet_length:end)./ref_sop_signal_corr_val(1:sop_signal_packet_length:end));
    
    ref_sat_signal = ref_sat_signal(ref_sop_signal_preamble_locs(1):ref_sop_signal_premble_locs(1)+length(ref_sop_signal_corr_val) -1);
    sat_signal = sat_signal(sop_signal_preamble_locs(1):sop_signal_preamble_locs(1) + length(sop_signal_corr_val) -1);
    
    
    phase_compensated_sat_signal = sat_signal.*conj(ref_sat_signal)*exp(-1i*repelem(phase_diff_sop_signal,sop_signal_packet_length));
    
    fine_phase = [];
    
    ref_sop_signal = ref_sop_signal(ref_sop_signal_preamble_locs(1):ref_sop_preamble_locs(1) + length(ref_sop_signal_corr_val)-1);
    sop_signal = sop_signal(sop_signal_preamble_locs(1):sop_preamble_locs(1) + length(ref_sop_signal_corr_val)-1);
    
    
    for i = 1:length(ref_sop_signal)/sop_signal_packet_length
        phase_ref_sop_signal_freq = unwrap(angle(fftshift(fft(ref_sop_signal((i-1)*length(preamble_sop_signal) +1:i*length(preamble_sop_signal))))./fftshift(fft(preamble_sop_signal))));
        phase_sop_signal_freq = unwrap(angle(fftshift(fft(sop_signal((i-1)*length(preamble_sop_signal) +1:i*length(preamble_sop_signal))))./fftshift(fft(preamble_sop_signal))));
        phase_ref_sat_signal_freq = movmean(unwrap(angle(fftshift(fft(ref_sat_signal((i-1)*length(preamble_sat_signal) +1:i*length(preamble_sat_signal))))./fftshift(fft(preamble_sat_signal)))),20);
        phase_sat_signal_freq = movmean(unwrap(angle(fftshift(fft(sat_signal((i-1)*length(preamble_sat_signal) +1:i*length(preamble_sat_signal))))./fftshift(fft(preamble_sat_signal)))),20);
        
        ref_sop_signal_idx = (1:length(phase_ref_sop_signal_freq))/0.25;
        ref_sat_signal_idx = ((1:length(phase_ref_sat_signal_freq))+length(phase_ref_sop_signal) + 200)/0.25;
        
        guardband_phase_diff_ref = spline(ref_sop_signal_idx,phase_ref_sop_signal_freq,25) - spline(ref_sat_signal_idx,phase_ref_sat_signal_freq,25);
        guardband_phase_diff_sat = spline(ref_sop_signal_idx,phase_sop_signal_freq,25) - spline(ref_sat_signal_idx,phase_sat_signal_freq,25);
        
        fine_phase = [fine_phase;guardband_phase_diff_ref - guardband_phase_diff_sat];
    end
    
    sync_sat_signal = phase_compensated_sat_signal*exp(-1i*repelem(fine_phase,sop_signal_packet_length));

end